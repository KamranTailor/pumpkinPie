const queryString = window.location.search;

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = '/'
} else {
  console.log("Query string is not empty");
}

// Check if queryString starts with a question mark
let line_id;
if (queryString.startsWith('?')) {
    // Remove the question mark and store the modified query
    line_id = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    line_id = queryString;
}

function getTimeToStation(stationName) {
    // Find the station by name
    let station = stations.find(st => st.name === stationName);
    if (!station) {
      console.log(`Station '${stationName}' not found.`);
      return null;
    }
    return station.timeFromDeparture;
  }

async function selectBranch(branchID) {
    const response = await fetch('/stops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({branchID})
    });
    const data = await response.json();
    console.log(data)

    for (i in lineData.branches) {
      if (lineData.branches[i].stations_id == branchID) {
        origin = lineData.branches[i].origin;
        destination = lineData.branches[i].destination;
        branchData = lineData.branches[i];
        console.log(branchData)
        console.log("DES AND ORIGEN SET")
      }
    }

    stations = data

    createCanvas(500, 1000);
    drawMap();
  
    setInterval(setTrains, 5000);
    setTrains()
}

async function setLine() {
    var lineName = document.getElementById('line-name');
    lineName.innerHTML= lineData.line_name;
    lineName.style.color= lineData.colour;

    let options = `
    <label for="branch">Choose a branch:</label>
    <select id="branch" name="branch">`
    for (i in lineData.branches) {
        const r = lineData.branches[i];
        options += `<option value="${r.stations_id}">${r.origin} to ${r.destination}</option>`
    }
    options += "</select>"
    document.getElementById("branch-box").innerHTML = options;

    const response = await fetch("/status");
    const data = await response.json();
    console.log(data);

    let status = {};
    if (lineData.mode === "tube") {
      console.log("Data is mode tube")

      for (i in data.tubeData) {
        console.log(data.tubeData[i].id, lineData.line_id)

        if (data.tubeData[i].id == lineData.line_id) {
          status = data.tubeData[i].lineStatuses[0]
          break
        }
      }
    } else {
      delete data.tubeData;
      for (i in data) {
        if (data[i][0].id == lineData.line_id) {
          status = data[i][0].lineStatuses[0]
          break
        }
      }
    }

    let detailedDescription = "";
    if (status.statusSeverity != 10) {
      detailedDescription = status.reason;
    } else {
      detailedDescription = "<a href='https://tfl.gov.uk/tube-dlr-overground/status/'>More Info </a>"
    }
    const toDisplay = `<div class="status-box">
      <div class="status-description">${setStatusOverall(status.statusSeverity)}</div>
      <div class="detailed-description">${detailedDescription}</div>
    </div>`
    document.getElementById("status").innerHTML= toDisplay;
}

function changeBranch() {
    branchid = document.getElementById("branch").value;

    selectBranch(branchid)
}
