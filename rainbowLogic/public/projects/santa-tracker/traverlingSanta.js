function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
}

// Function to get distance between two destinations
function getDistanceBetweenDestinations(destination1, destination2) {
    const lat1 = destination1.location.lat;
    const lon1 = destination1.location.lng;
    const lat2 = destination2.location.lat;
    const lon2 = destination2.location.lng;

    return calculateDistance(lat1, lon1, lat2, lon2);
}




function interpolateCoordinates(departureTime, arrivalTime, departureLat, departureLon, arrivalLat, arrivalLon, currentTime) {
    // Calculate the total time between departure and arrival
    const totalTime = arrivalTime - departureTime;

    // Calculate the time that has passed since departure
    const elapsedTime = currentTime - departureTime;

    // If the current time is before the departure time, return the departure coordinates
    if (elapsedTime <= 0) {
        return { lat: departureLat, lon: departureLon };
    }

    // If the current time is after the arrival time, return the arrival coordinates
    if (elapsedTime >= totalTime) {
        return { lat: arrivalLat, lon: arrivalLon };
    }

    // Calculate the fraction of time that has passed
    const fraction = elapsedTime / totalTime;

    // Interpolate between the two points
    const interpolatedLat = departureLat + fraction * (arrivalLat - departureLat);
    const interpolatedLon = departureLon + fraction * (arrivalLon - departureLon);

    return { lat: interpolatedLat, lon: interpolatedLon };
}
