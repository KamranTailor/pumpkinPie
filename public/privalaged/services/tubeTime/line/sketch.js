let stations = [];
let lineData = [];
let origin;
let destination;
let branchData = [];

let sf = 0.5; // Scale factor

async function setup() {
  const linesResponce = await fetch("/overallLines");
  const linesDataReq = await linesResponce.json();

  for (i in linesDataReq) {
    const r = linesDataReq[i];
    if (r.line_id === line_id) {
      lineData = r;
    }
  }
  console.log(lineData)

  if (lineData.branches.length === 0) {
    setLine();
    let buttons_box = document.getElementById("buttons-box");
    let na = document.getElementById("na");
    buttons_box.style.display = "none";
    na.style.display = "block";
  } else {
    setLine()
    selectBranch(lineData.branches[0].stations_id)
  }
}

function drawMap() {
  const lineColor = color(lineData.colour); 

  //Set Bg
  background(220); 
  
  //Last Updated
  const timestamp = Date.now(); const date = new Date(timestamp); const hours = date.getHours(); const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  fill(0, 0, 0); textSize(12);
  text(`Last Updated ${formattedTime}`, 10, 20)

  // Draw the main vertical line representing total time
  
  stroke(lineColor); 
  fill(lineColor); 
  strokeWeight(4);
  let totalTime = stations[stations.length - 1].timeFromDeparture * sf;
  line(50, 50, 50, 50 + totalTime);
  
  // Draw small vertical lines and station names
  textSize(16); 
  textAlign(LEFT, CENTER); 
  for (let i = 0; i < stations.length; i++) {
    let y = 50 + stations[i].timeFromDeparture * sf;
    strokeWeight(4);
    fill(lineData.colour); 
    line(40, y, 60, y); 

    fill(lineData.colour); 
    strokeWeight(0);
    text(stations[i].name, 70, y); 
  }
}

async function setTrains() {
  const response = await fetch("/arrivals");
  const data = await response.json();
  console.log("Updated Data")

  const allDestinations = [destination, ...branchData.other_destinations];

  console.log(destination, allDestinations, data[i].destinationName)
  drawMap();
  setAllTrains(data)
  for (i in data) {
    if (data[i].destinationName == destination && data[i].stationName != origin) { //or any of the other destinations / origens
      let timeToStation = data[i].timeToStation; 
      let targetStation = data[i].stationName;
      let timeToArrivalStation = getTimeToStation(targetStation);
      
      let trainY = 50 + (timeToArrivalStation - timeToStation) * sf;
      
      // Draw the train dot
      fill(0 , 0, 0); // Red color
      noStroke(); // No outline
      ellipse(50, trainY, 15, 15); // Train dot
      textSize(12); // Adjust text size here
      text(data[i].vehicleId, 20, trainY)
    }
  }


}

function draw() {
  // No continuous drawing needed, so leave this empty
}
