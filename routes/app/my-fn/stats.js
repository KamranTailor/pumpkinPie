// app/my-fn/stats.js

import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/stats', async (request, response) => {
    try {
        const { username, platform } = request.query;

        let platformEDI = "";
        if (platform === "XBOX") {
            platformEDI = "xbl";
        } else if (platform === "Epic") {
            platformEDI = "epic";
        } else if (platform === "PSN") {
            platformEDI = "psn";
        }

        const url = `https://fortnite-api.com/v2/stats/br/v2?name=${username}&accountType=${platformEDI}`;

        // Set the headers, including the Authorization header
        const headers = {
            'Authorization': process.env.FNAPI // Make sure to define FNAPI in your .env file
        };

        const requestOptions = {
            method: 'GET',
            headers
        };

        // Make the HTTP request and await the response
        const apiResponse = await fetch(url, requestOptions);
        const data = await apiResponse.json();
        const l = data.data;

        response.json({ l });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
