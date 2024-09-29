const socket = io('/flights');

// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 10); // Coordinates: [Latitude, Longitude]

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = {}; // Store markers by flight number

// Request flight data
socket.emit('requestFlightData', { flightNumber: 'AA123' });

// Receive flight data
socket.on('flightData', (data) => {
    console.log('Flight Data:', data);

    // Create a set of flight numbers currently in the data
    const currentFlights = new Set();

    data.data[0].aircraft.forEach(r => {
        // Check if the flight number and coordinates exist
        if (!r.flight || !r.lat || !r.lon) {
            return; // If any essential data is missing, skip this aircraft
        }

        const flightNumber = r.flight;
        const lat = r.lat;
        const lon = r.lon;

        // Add flight number to the currentFlights set
        currentFlights.add(flightNumber);

        // Get the appropriate icon based on category
        const icon = getIcon(r.category);

        // Check if this flight already has a marker
        if (markers[flightNumber]) {
            // Update the marker's position
            markers[flightNumber].setLatLng([lat, lon]);
            markers[flightNumber]._icon.style.transform += ` rotate(${r.track}deg)`;
            markers[flightNumber]._icon.style.transformOrigin = 'center';
        } else {
            // Add a new marker with the appropriate icon
            const newMarker = L.marker([lat, lon], { icon: icon }).addTo(map)
                .bindPopup(`Flight: ${flightNumber}`);

            // Check and apply rotation based on track value
            if (r.track !== undefined) {
                newMarker._icon.style.transform += ` rotate(${r.track}deg)`;
                newMarker._icon.style.transformOrigin = 'center';
            }

            // Save the marker to the markers object
            markers[flightNumber] = newMarker;
        }
    });

    // Remove markers that are no longer in the current data
    for (const flightNumber in markers) {
        if (!currentFlights.has(flightNumber)) {
            // Remove the marker from the map
            map.removeLayer(markers[flightNumber]);
            // Delete the marker from the markers object
            delete markers[flightNumber];
        }
    }
});

// Handle disconnection from server
socket.on('disconnect', () => {
    alert("Disconnected from server");
});
