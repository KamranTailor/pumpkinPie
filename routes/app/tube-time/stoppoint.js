import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/tfl-stoppoint', async (request, response) => {
    try {
        const { id } = request.query;

        const url0 =  `https://api.tfl.gov.uk/StopPoint/${id}`
        const url1 = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals` 

        const responce0 = await fetch(url0)
        const responce1 = await fetch(url1)

        const stationData = await responce0.json()
        const arrivals = await responce1.json()

        response.json({ stationData, arrivals }); // Combine into a single object
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
