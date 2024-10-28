import express from 'express';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';

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
        const { lon, lat } = request.query;

        if (!lon || !lat) {
            return response.status(400).json({ error: 'Longitude and latitude are required' });
        }

        const distanceFromLondon = calculateDistance(
            parseFloat(lat),
            parseFloat(lon),
            londonCoordinates.latitude,
            londonCoordinates.longitude
        );

        const londonThreshold = 33; // in kilometers
        const isNearLondon = distanceFromLondon <= londonThreshold;

        if (isNearLondon) {
            const userLocation = { lat: parseFloat(lat), lon: parseFloat(lon) };
            const tubeStoppoints = await loadTubeStoppoints();

            if (!tubeStoppoints.length) {
                return response.status(500).json({ error: 'Unable to load tube stoppoints data' });
            }

            const closestStations = findClosestStations(userLocation, tubeStoppoints, 3);
            const busStops = await getBus(lat, lon);

            response.json({ nearLondon: isNearLondon, closestStations, busStops });
        } else {
            response.status(404).json({ message: 'Location is not near London' });
        }
    } catch (error) {
        console.error('Error processing nearby request:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getBus(lat, lon) {
    try {
        const tflKey = process.env.TFL;
        if (!tflKey) {
            throw new Error('Missing TFL API key');
        }

        const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=700&app_id=${tflKey}`;
        const tflResponse = await fetch(url);

        if (!tflResponse.ok) {
            throw new Error(`Failed to fetch bus stops: ${tflResponse.statusText}`);
        }

        const resData = await tflResponse.json();

        resData.stopPoints.forEach(stop => {
            delete stop.modes;
            delete stop.lines;
            delete stop.lineGroup;
            delete stop.lineModeGroups;
            delete stop.additionalProperties;
        });

        return resData.stopPoints;
    } catch (error) {
        console.error('Error fetching bus stops:', error);
        return [];
    }
}

async function loadTubeStoppoints() {
    try {
        const data = await fs.readFile('./dataset/tfl-stations/stations.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading tube stoppoints:', error);
        return []; // Return empty array if unable to load data
    }
}

function findClosestStations(userLocation, tubeStoppoints, numStations) {
    const stationsWithDistance = tubeStoppoints.map(station => ({
        ...station,
        distance: calculateDistance(userLocation.lat, userLocation.lon, station.lat, station.lon)
    }));

    stationsWithDistance.sort((a, b) => a.distance - b.distance);

    return stationsWithDistance.slice(0, numStations);
}

export default router;
