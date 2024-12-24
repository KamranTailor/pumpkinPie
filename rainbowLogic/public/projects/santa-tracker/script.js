let santaTraverling = true;
let nextLocation;
let data;
var treeIcon = L.icon({
    iconUrl: './icons/tree-marker-icon.png',
    iconRetinaUrl: './icons/tree-marker-icon-2x.png',
    iconSize: [41, 41],
});

var giftIcon = L.icon({
    iconUrl: './icons/gift-marker-icon.png',
    iconRetinaUrl: './icons/gift-marker-icon-2x.png',
    iconSize: [41, 41],
});

var santaIcon = L.icon({
    iconUrl: './icons/santa-marker-icon.png',
    iconRetinaUrl: './icons/santa-marker-icon-2x.png',
    iconSize: [60, 60], // Increase the size of the Santa icon
    iconAnchor: [30, 60], // Adjust anchor to center the icon properly (optional)
});

var santaSleighIcon = L.icon({
    iconUrl: './icons/sleigh.png',
    iconSize: [60, 60], // Increase the size of the Santa icon
    iconAnchor: [30, 60], // Adjust anchor to center the icon properly (optional)
});

var popupOptions = {
    className: 'custom-popup', // Assign a custom class to the popup
    maxWidth: 300,             // Set a maximum width for the popup
    minWidth: 150,             // Set a minimum width for the popup
    closeButton: true,         // Show a close button for the popup
};

var map = L.map('map').setView([0, 0], 1); // [latitude, longitude], zoom level



async function onStart() {
    const response = await fetch('https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b');
    data = await response.json();

    // Add a tile layer (Map tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //fetchData(new Date(Date.now()));
    //setInterval(() => {
    //    if (santaTraverling) {
    //        fetchData(new Date(Date.now()));
    //    }
    //}, 10000); // 10 seconds


    //fetchData(new Date('2024-12-25T01:34:30.115Z'));
    countdown()
}

async function fetchData(currentDate) {

    // Adjust to GMT by ensuring all dates are in UTC
    const destinations = data.destinations.map(destination => {
        const { arrival, departure } = destination;

        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);

        // Convert to UTC
        arrivalDate.setUTCFullYear(2024);
        departureDate.setUTCFullYear(2024);

        return {
            ...destination,
            arrival: arrivalDate.getTime(),
            departure: departureDate.getTime()
        };
    });

    // Add markers to the map
    destinations.map(destination => {
        const arrivalDate = new Date(destination.arrival);
        const arrivalHours = arrivalDate.getUTCHours();  // Use UTC hours
        const arrivalMinutes = arrivalDate.getUTCMinutes();  // Use UTC minutes
        const arrivalTime = `${arrivalHours}:${arrivalMinutes}`;

        const departureDate = new Date(destination.departure);
        const departureHours = departureDate.getUTCHours();  // Use UTC hours
        const departureMinutes = departureDate.getUTCMinutes();  // Use UTC minutes
        const departureTime = `${departureHours}:${departureMinutes}`;

        // Compare times to determine Santa's status
        const santaWasHere = currentDate.getTime() > departureDate.getTime();
        const santaIsHere = currentDate.getTime() >= arrivalDate.getTime() && currentDate.getTime() <= departureDate.getTime();

        let marker;
        if (santaIsHere) {
            santaTraverling = false;
            marker = L.marker([destination.location.lat, destination.location.lng], {
                icon: santaIcon,
                zIndexOffset: 200 // Set higher z-index for prominence
            }).addTo(map);
            nextLocation = destination;
        } else if (santaWasHere) {
            marker = L.marker([destination.location.lat, destination.location.lng], { icon: giftIcon }).addTo(map);
        } else {
            marker = L.marker([destination.location.lat, destination.location.lng], { icon: treeIcon }).addTo(map);
        }

        marker.bindPopup(
            `<b>${destination.city}</b><br>
            Arrival: ${arrivalDate.toUTCString()} @ ${arrivalTime}<br>
            Departure: ${departureDate.toUTCString()} @ ${departureTime}`,
            popupOptions
        );
    });

    console.log("santa is traverling", santaTraverling);
    if (santaTraverling) {
        let nextArrival = null;
        let lastDeparture = null;

        // Iterate through the sorted destinations list
        for (let i in destinations) {
            const destination = destinations[i];

            // Check if the arrival is in the future (next arrival)
            if (destination.arrival > currentDate && !nextArrival) {
                nextArrival = destination;
            }

            // Check if the departure is in the past (last departure)
            if (destination.departure < currentDate) {
                lastDeparture = destination;
            }

            // If both are found, no need to continue the loop
            if (nextArrival && lastDeparture) {
                break;
            }
        }

        console.log('Next Arrival:', nextArrival.city, new Date(nextArrival.arrival).toUTCString());
        console.log('Last Departure:', lastDeparture.city, new Date(lastDeparture.departure).toUTCString());

        console.log(nextArrival.location.lng, nextArrival.location.lat);
        console.log(lastDeparture.location.lng, lastDeparture.location.lat);
        const distance = getDistanceBetweenDestinations(nextArrival, lastDeparture);

        console.log(distance)

        const currentLocation = interpolateCoordinates(
            lastDeparture.departure,
            nextArrival.arrival,
            lastDeparture.location.lat,
            lastDeparture.location.lng,
            nextArrival.location.lat,
            nextArrival.location.lng,
            currentDate.getTime()
        );

        var point1 = [lastDeparture.location.lat, lastDeparture.location.lng];  // Point 1: London
        var point2 = [nextArrival.location.lat, nextArrival.location.lng];   // Point 2: Close to London

        // Draw a line between the two points
        var latlngs = [point1, point2];
        var polyline = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(map);

        marker = L.marker([currentLocation.lat, currentLocation.lon], {
            icon: santaSleighIcon,
            zIndexOffset: 200 // Set higher z-index for prominence
        }).addTo(map);

        marker.bindPopup(`<b>Next Stop: ${nextArrival.city}</b>`);

        console.log(`Current location: Lat = ${currentLocation.lat}, Lon = ${currentLocation.lon}`);
        nextLocation = nextArrival
    }

    console.log(nextLocation)
    let diffInMilliseconds;
    if (santaTraverling) {
        document.getElementById('type').innerHTML = `<span class="highlight"> Traverling </span> To`;
        document.getElementById('arrival-icon').innerHTML = `<img src="./icons/sleigh.png" alt="Santa Sleigh" class="icon" width="35px" height="35px"> Arriving in`;
        diffInMilliseconds = nextLocation.arrival - currentDate.getTime();
    } else {
        document.getElementById('type').innerHTML = `<span class="highlight"> Delivering Presents </span> In`;
        document.getElementById('arrival-icon').innerHTML = `<img src="./icons/santa.png" alt="Santa Sleigh" class="icon" width="35px" height="35px"> Leaving in`;
        diffInMilliseconds = nextLocation.departure - currentDate.getTime();
    }

    const diffInSeconds = diffInMilliseconds / 1000;

    // Convert seconds to minutes and remaining seconds
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    document.getElementById('arrival-time-m').innerHTML = `${minutes}`;
    document.getElementById('arrival-time-s').innerHTML = `${seconds}`;
    document.getElementById('locationNow').innerHTML = `${nextLocation.city}, ${nextLocation.region}`;

    document.getElementById('deliverd').innerHTML = `${nextLocation.presentsDelivered} `;
    document.getElementById('population').innerHTML = `${nextLocation.population} `;


    document.getElementById('lastUpdated').innerHTML = currentDate.toUTCString();

    let toAdd = "";
    for (let i in nextLocation.details.photos) {
        if (i > 3) {
            break;
        }
        const match = nextLocation.details.photos[i].attributionHtml.match(/href="([^"]*)"/);

        if (match) {
            const link = match[1];
            toAdd += `<a href="${link}"> <img src="${nextLocation.details.photos[i].url}" alt="Santa image ${i}"> </a>`
        }
    }
    document.getElementById('photopGallary').innerHTML = toAdd;
}

function countdown() {
    const minutesElement = document.getElementById("arrival-time-m");
    const secondsElement = document.getElementById("arrival-time-s");
  
    let minutes = parseInt(minutesElement.textContent, 10);
    let seconds = parseInt(secondsElement.textContent, 10);
  
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer); // Stop the timer
          fetchData(new Date(Date.now())); // Run the function when the timer reaches 0
          return;
        } else {
          minutes -= 1;
          seconds = 59;
        }
      } else {
        seconds -= 1;
      }
  
      // Update the HTML elements
      minutesElement.textContent = minutes;
      secondsElement.textContent = seconds.toString().padStart(2, "0");
    }, 1000);
  }
  


onStart()