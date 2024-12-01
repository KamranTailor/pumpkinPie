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

async function getStatus() {
    const response = await fetch("/tubeTime/status", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json", // Specify the type of content
            email: localStorage.getItem('email'),
            session: localStorage.getItem('session')
        }
    });
    const dataRes = await response.json();
    console.log(dataRes);

    let dataRel;
    if(line_id == "london-overground") {
        dataRel = dataRes.data[0].overgroundData[0]
    } else if (line_id == "elizabeth") {
        dataRel = dataRes.data[0].elizabethData[0]
    } else if (line_id == "drl") {
        dataRel = dataRes.data[0].dlData[0]
    } else if (line_id == "tram") {
        dataRel = dataRes.data[0].tramData[0]
    } else {
        for (let i in dataRes.data[0].tubeData) {
            if (dataRes.data[0].tubeData[i].id == line_id) {
                dataRel = dataRes.data[0].tubeData[i];
            }
        }
        for (let i in dataRes.data[0].overgroundData) {
            if (dataRes.data[0].overgroundData[i].id == line_id) {
                dataRel = dataRes.data[0].overgroundData[i];
            }
        }
    }

    console.log(dataRel);
    document.getElementById("line-name").innerHTML= `<span id="${dataRel.id}-FG">${dataRel.name}</span>`
    document.getElementById("line-status").innerHTML= setStatusOverall(dataRel.lineStatuses[0].statusSeverity);
    
    if(dataRel.lineStatuses[0].statusSeverity != 10) {
        document.getElementById("line-description").style.display = "block"; 
        document.getElementById("line-description").innerHTML= `${dataRel.lineStatuses[0].reason}`;
    }
}

getStatus();