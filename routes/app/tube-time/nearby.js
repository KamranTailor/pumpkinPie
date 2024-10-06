import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Mock coordinates of London
const londonCoordinates = {
    latitude: 51.5074,
    longitude: -0.1278
};

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180; // convert to radians
    const dLon = (lon2 - lon1) * Math.PI / 180; // convert to radians
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

router.get('/nearby', async (request, response) => {
    try {
        // Get lon and lat from the params
        const { lon, lat } = request.query;

        // Check if user is in London
        const distanceFromLondon = calculateDistance(
            parseFloat(lat),
            parseFloat(lon),
            londonCoordinates.latitude,
            londonCoordinates.longitude
        );

        // Define a threshold for considering if the user is in London
        const londonThreshold = 33; // in kilometers

        // Check if the user is within the threshold distance of London
        const isNearLondon = distanceFromLondon <= londonThreshold;

        if (isNearLondon) {
            // If user is in London, find the 3 closest tube stations
            const userLocation = { lat: parseFloat(lat), lon: parseFloat(lon) };
            const tubeStoppoints = await loadTubeStoppoints(); // Load tube stoppoints data
            const closestStations = findClosestStations(userLocation, tubeStoppoints, 3);

            const busStops = await getBus(lat, lon) 

            response.json({ nearLondon: isNearLondon, closestStations, busStops });
        } else {
            response.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getBus(lat, lon) {
    const tflKey = process.env.TFL
    const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=700&app_id=${tflKey}`;
    const tflResponse = await fetch(url);
    const resData = await tflResponse.json();

    for (let i in resData.stopPoints) {
        delete resData.stopPoints[i].modes
        delete resData.stopPoints[i].lines
        delete resData.stopPoints[i].lineGroup
        delete resData.stopPoints[i].lineModeGroups
        delete resData.stopPoints[i].additionalProperties
    }

    return await resData.stopPoints;
}

// Function to load tube stoppoints data from a JSON file
async function loadTubeStoppoints() {
    try {
        const data = await fsPromises.readFile('../database/tfl/stoppoint/stations.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading tube stoppoints:', error);
        return []; // Return empty array if unable to load data
    }
}

// Function to find the closest stations to a given location
function findClosestStations(userLocation, tubeStoppoints, numStations) {
    // Calculate distances to all stations
    const stationsWithDistance = tubeStoppoints.map(station => ({
        ...station,
        distance: calculateDistance(userLocation.lat, userLocation.lon, station.lat, station.lon)
    }));

    // Sort stations by distance
    stationsWithDistance.sort((a, b) => a.distance - b.distance);

    // Return the closest stations up to the specified number
    return stationsWithDistance.slice(0, numStations);
}

export default router;
