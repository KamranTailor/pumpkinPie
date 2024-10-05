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