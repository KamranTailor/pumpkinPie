// app/tube-time/status.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';

const router = express.Router();

router.get('/tfl-status', async (request, response) => {
    try {
        const filePath = '../database/tfl/status.json';

        // Read the contents of the JSON file using fsPromises.readFile() method
        const data = await fsPromises.readFile(filePath, 'utf8');

        // Parse the JSON data
        const jsonData = JSON.parse(data);

        response.json(jsonData);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
