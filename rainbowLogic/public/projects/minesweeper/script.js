const urlParams = new URLSearchParams(window.location.search);

// Retrieve the values for size and mines
const gridSize = parseInt(urlParams.get('size')) || 10; // Default to 10 if not provided
const mineCount = parseInt(urlParams.get('mines')) || 10; // Default to 10 if not provided


let grid = [];
let showCount = 0;
let firstGo = true;
let markedCells = [];
let mines = [];

function onStart() {
    let minutes = 0;
    let seconds = 0;

    const updateTimer = () => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        document.getElementById("timer-m").innerText = String(minutes).padStart(2, '0');
        document.getElementById("timer-s").innerText = String(seconds).padStart(2, '0');
    };

    countdownTimer = setInterval(updateTimer, 1000);


    document.getElementById("flagCount").innerHTML = markedCells.length;
    createGrid();
}

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        grid.push([]);
        for (let j = 0; j < gridSize; j++) {
            grid[i].push({
                bomb: 0,
                id: Math.floor(100000 + Math.random() * 900000),
                x: i,
                y: j,
                marker: false,
            });
        }
    }
    placeMines()
    calculateNumbers()
    console.log(grid)
    console.log(mines)

    const gridContainer = document.getElementById('grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize; i++) { //row
        for (let j = 0; j < gridSize; j++) { // col
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', grid[i][j].id);

            let isMine = false;
            if (grid[i][j].bomb === "M") {
                cell.classList.add('mine');
                isMine = true;
            }

            // Add an event listener for mouse clicks
            cell.addEventListener('mousedown', function (event) {
                if (event.button === 0) {
                    // Left click (button 0)
                    cellClick(grid[i][j], 'left');
                } else if (event.button === 2) {
                    // Right click (button 2)
                    cellClick(grid[i][j], 'right');
                }
            });

            // Prevent the default context menu from appearing on right-click
            cell.oncontextmenu = function (event) {
                event.preventDefault(); // Only if you want to disable the context menu on right-click
            };

            // Append the cell to the grid container
            gridContainer.appendChild(cell);

        }
    }

}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (grid[row][col].bomb === 0) { // Only place mine if the cell is empty
            grid[row][col].bomb = "M"; // "M" for mine
            minesPlaced++;
        }
    }
}

function calculateNumbers() {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j].bomb === "M") {
                mines.push(grid[i][j]);
                continue;
            }

            let count = 0;
            for (let k = 0; k < directions.length; k++) {
                const row = i + directions[k][0];
                const col = j + directions[k][1];

                if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
                    if (grid[row][col].bomb === "M") {
                        count++;
                    }
                }
            }
            grid[i][j].bomb = count;
        }
    }
}


function cellClick(cell, type) {
    if (type === 'left') {
        console.log(cell);

        if (cell.bomb === "M") {
            endGame(false);
        } else {
            showCell(cell);

            if (firstGo || cell.bomb == 0) {
                revealCells(cell);
                firstGo = false
            }
        }
    } else {
        const cellDom = document.getElementById(cell.id);
        if (cell.marker) {
            cell.marker = false;
            cellDom.classList.remove('marked');

            for (i in markedCells) {
                if (markedCells[i].id === cell.id) {
                    markedCells.splice(i, 1);
                }
            }
        } else if (markedCells.length > mineCount) {
            alert('You have marked too many markers!');
        } else {

            if (!markedCells.some(markedCell => markedCell.id === cell.id)) {
                markedCells.push(cell);
            }

            cell.marker = true;
            cellDom.classList.add('marked');

            if (markedCells.length == mineCount) {
                let minesToFind = mineCount;

                for (i in markedCells) {
                    if (grid[markedCells[i].x][markedCells[i].y].bomb == "M") {
                        minesToFind--;
                    }
                }

                if (minesToFind == 0) {
                    endGame(true)
                }
            }
        }

        document.getElementById("flagCount").innerHTML = markedCells.length;
    }
}

function revealCells(cell) {
    const directions = [
        { dx: 1, dy: 0 }, // Right
        { dx: -1, dy: 0 }, // Left
        { dx: 0, dy: 1 }, // Down
        { dx: 0, dy: -1 }, // Up
    ];

    const revealed = new Set(); // To track revealed cells

    // A helper function to mark a cell as revealed
    function reveal(x, y) {
        const cellKey = `${x},${y}`;
        if (!revealed.has(cellKey) && x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
            revealed.add(cellKey);
            showCell(grid[x][y]);

            // If it's a zero, reveal its neighbors
            if (grid[x][y].bomb === 0) {
                // Check all 8 possible neighbors around (x, y)
                const neighbors = [
                    { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
                    { dx: 0, dy: 1 }, { dx: 0, dy: -1 },
                    { dx: 1, dy: 1 }, { dx: 1, dy: -1 },
                    { dx: -1, dy: 1 }, { dx: -1, dy: -1 }
                ];

                // Reveal neighbors if they are not bombs and not revealed yet
                for (let neighbor of neighbors) {
                    const nx = x + neighbor.dx;
                    const ny = y + neighbor.dy;
                    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && grid[nx][ny].bomb !== "M") {
                        reveal(nx, ny);
                    }
                }
            }
        }
    }

    // Start by revealing the initial cell
    reveal(cell.x, cell.y);

    // Now check the four directions
    for (let dir of directions) {
        let x = cell.x;
        let y = cell.y;

        while (x >= 0 && x < gridSize && y >= 0 && y < gridSize && grid[x][y].bomb !== "M") {
            if (grid[x][y].bomb !== 0) {
                // If we encounter a non-zero value, reveal the cell
                reveal(x, y);
                break;
            }

            // If it's a zero, reveal adjacent cells in all directions
            reveal(x, y);

            // Move to the next cell in the current direction
            x += dir.dx;
            y += dir.dy;
        }
    }
}



function showCell(cell) {
    let cellDom = document.getElementById(cell.id);
    cellDom.classList.add('clicked');

    if (cell.bomb !== 0) {
        cellDom.innerHTML = cell.bomb;
    }
}
function endGame(won) {

    if (won) {
        alert('You won!');
    } else {
        alert('Game Over');
    }
}

onStart();
