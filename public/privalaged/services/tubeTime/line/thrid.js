function setStatusOverall(number) {
    let status = "";
    let color = "";
    let icon = "";

    if (number === 0) {
        status = 'Special Service';
        color = 'red';
        icon = "⚠️";
    } else if (number === 1) {
        status = 'Closed';
        color = 'red';
        icon = "⛔️";
    } else if (number === 2) {
        status = 'Suspended';
        color = 'orrange';
        icon = "⛔️";
    } else if (number === 3) {
        status = 'Part Suspended';
        color = 'orrange';
        icon = "⛔️";
    } else if (number === 4) {
        status = 'Planned Closure';
        color = 'orrange';
        icon = "🏗️";
    } else if (number === 5) {
        status = 'Part Closure';
        color = 'orrange';
        icon = "⛔️";
    } else if (number === 6) {
        status = 'Severe Delays';
        color = 'red';
        icon = "⚠️";
    } else if (number === 7) {
        status = 'Reduced Service';
        color = 'red';
        icon = "⚠️";
    } else if (number === 8) {
        status = 'Bus Service';
        color = 'orrange';
        icon = "🚌";
    } else if (number === 9) {
        status = 'Minor Delays';
        color = 'orrange';
        icon = "⚠️";
    } else if (number === 10) {
        status = 'Good Service';
        color = 'black';
        icon = "✅"
    } 

    return `<div id="${color}">${icon} ${status}</div>`;
}

function setAllTrains(data) {
    console.log(data)
  
    let toAdd = "";
    for (i in data) {
      const r = data[i];
      toAdd += `<div class="train" id="${r.vehicleId}">
        <div class="vehicleId">${r.vehicleId}</div>
        <div class="currentLocation">${r.currentLocation}</div>
        <div class="destinationName">${r.destinationName}</div>
        <div class="timeToStation">${r.timeToStation}</div>
      </div>`
    }
    document.getElementById("insertTrains").innerHTML= toAdd;
  }
  
  function showAllTrains() {
    const allTrains = document.getElementById("allTrains");
    const button = document.getElementById("show-hide-trains");
  
    if (allTrains.style.display === "block") {
      allTrains.style.display = "none";
      button.innerHTML = "Show Trains";
    } else {
      allTrains.style.display = "block";
      button.innerHTML = "Hide Trains";
    }
  }
  
  document.getElementById('searchInput').addEventListener('input', function() {
    let searchValue = this.value.toLowerCase();
    let trains = document.getElementsByClassName('train');
    
    for (let train of trains) {
        let vehicleId = train.querySelector('.vehicleId').textContent.toLowerCase();
        if (vehicleId.includes(searchValue)) {
            train.style.display = 'block';
        } else {
            train.style.display = 'none';
        }
    }
  });