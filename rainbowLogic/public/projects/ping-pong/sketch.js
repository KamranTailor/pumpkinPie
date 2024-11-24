let playing = false;
let paused = true;

let paddleWidth = 10;
let paddleHeight = 100;
let leftPaddleY, rightPaddleY;
let ballX, ballY, ballSpeedX, ballSpeedY;
let leftScore = 0, rightScore = 0;
let paddleSpeed = 5;

let display = "inline-block";
function setup() {
    createCanvas(400, 400);

    // Initialize positions
    leftPaddleY = height / 2 - paddleHeight / 2;
    rightPaddleY = height / 2 - paddleHeight / 2;

    ballX = width / 2;
    ballY = height / 2;
    ballSpeedX = 4;
    ballSpeedY = random(-3, 3);
}

function draw() {
    if (leftScore >= 5) {
        leftScore = 0, rightScore = 0;
        alert("Player One Wins!!");
        playId.style.display = display;
        pauseId.style.display = "none";
        unPauseId.style.display = "none";
        resetId.style.display = "none";
        playing = false;
        paused = true;
    }

    if (rightScore >= 5) {
        leftScore = 0, rightScore = 0;
        alert("Player Two Wins!!");
        playId.style.display = display;
        pauseId.style.display = "none";
        unPauseId.style.display = "none";
        resetId.style.display = "none";
        playing = false;
        paused = true;
    }
    if (playing == true) {
        background(0);
        stroke(255);
        line(width / 2, 0, width / 2, height);

        // Draw paddles
        fill(255);
        rect(20, leftPaddleY, paddleWidth, paddleHeight);
        rect(width - 20 - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

        // Draw ball
        ellipse(ballX, ballY, 20);

        // Ball movement
        if (paused == false) {
            ballX += ballSpeedX;
            ballY += ballSpeedY;
        }

        // Ball collision with top and bottom
        if (ballY <= 0 || ballY >= height) {
            ballSpeedY *= -1;
        }

        // Ball collision with paddles
        if (ballX - 10 < 30 && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
            ballSpeedX *= -1.03;
            ballX = 30 + 15; // Prevent sticking
        }

        if (ballX + 10 > width - 30 && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
            ballSpeedX *= -1.03;
            ballX = width - 30 - 15; // Prevent sticking
        }

        // Scoring
        if (ballX < 0) {
            rightScore++;
            resetBall();
        } else if (ballX > width) {
            leftScore++;
            resetBall();
        }

        // Display scores
        textSize(32);
        textAlign(CENTER, CENTER);
        text(leftScore, width / 4, 30);
        text(rightScore, 3 * width / 4, 30);

        // Paddle movement
        if (keyIsDown(87)) { // 'W' key
            leftPaddleY = max(0, leftPaddleY - paddleSpeed);
        }
        if (keyIsDown(83)) { // 'S' key
            leftPaddleY = min(height - paddleHeight, leftPaddleY + paddleSpeed);
        }
        if (keyIsDown(UP_ARROW)) {
            rightPaddleY = max(0, rightPaddleY - paddleSpeed);
        }
        if (keyIsDown(DOWN_ARROW)) {
            rightPaddleY = min(height - paddleHeight, rightPaddleY + paddleSpeed);
        }
    }
}

let playId = document.getElementById("play");
let pauseId = document.getElementById("pause");
let unPauseId = document.getElementById("unPause");
let resetId = document.getElementById("reset");

playId.style.display = display;
pauseId.style.display = "none";
unPauseId.style.display = "none";
resetId.style.display = "none";

function play() {
    playId.style.display = "none";
    pauseId.style.display = display;
    unPauseId.style.display = "none";
    resetId.style.display = display;

    playing = true;
    paused = false;


    leftScore = 0, 
    rightScore = 0;
    paddleSpeed = 5;

    resetBall();
}

function pause() {
    playId.style.display = "none";
    pauseId.style.display = "none";
    unPauseId.style.display = display;
    resetId.style.display = display;

    playing = false;
}

function unPause() {
    playId.style.display = "none";
    pauseId.style.display = display;
    unPauseId.style.display = "none";
    resetId.style.display = display;

    playing = true;
}
function reset() {
    play()
}


function resetBall() {
    ballX = width / 2;
    ballY = height / 2;
    ballSpeedX *= -1;
    ballSpeedY = random(-3, 3);
}