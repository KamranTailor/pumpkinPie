async function getLines() {
    const response = await fetch("/tubeTime/status", {
        method: "GET", // You can use "POST", "PUT", etc. if needed
        headers: {
          "Content-Type": "application/json", // Specify the type of content
          email: localStorage.getItem('email'),
          session: localStorage.getItem('session')
        }
      });
    const dataRes = await response.json();
    const data = dataRes.data[0];

    console.log(data.tubeData)
    let toDisplay = "<h2>Tube Lines</h2> <hr>";
    for (i in data.tubeData) {
        const r = data.tubeData[i];

        console.log()
        toDisplay += `<div class="line">
        <div class="line-info">
          <div class="line-name" id="${r.id}-FG">${r.name}</div>
          <div class="line-status">${setStatus(r.lineStatuses[0])}</div>
        </div>
        <button class="button-line" id="${r.id}-BG" onclick="seeMore('${r.id}')">See More</button>
      </div>`
    }
    
    toDisplay += "<br> <h2>Overground</h2> <hr>";
    for (i in data.overgroundData) {
      let r = data.overgroundData[i]
      toDisplay += `
      <div class="line">
          <div class="line-info">
            <div class="line-name" id="${r.id}-FG">${r.name}</div>
            <div class="line-status">${setStatus(r.lineStatuses[0])}</div>
          </div>
          <button class="button-line" id="${r.id}-BG" onclick="seeMore('${r.id}')">See More</button>
        </div>
      `;
    }

    delete data.tubeData;
    delete data.overgroundData;
    delete data.timestampISO;
    toDisplay += "<br> <h2>Other</h2> <hr>";
    for (i in data) {
        const r = data[i][0];
        console.log(r)
        toDisplay += `<div class="line">
        <div class="line-info">
          <div class="line-name" id="${r.id}-FG">${r.name}</div>
          <div class="line-status">${setStatus(r.lineStatuses[0])}</div>
        </div>
        <button class="button-line" id="${r.id}-BG" onclick="seeMore('${r.id}')">See More</button>
      </div>`
    }

    document.getElementById("TubeLines").innerHTML= toDisplay;
}

function setStatus(statusData) {
    const number = statusData.statusSeverity;
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


function seeMore(id) {
    window.location = `./line?${id}`
}
getLines()