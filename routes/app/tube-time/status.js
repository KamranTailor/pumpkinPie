// app/tube-time/status.js

import express from 'express';
import kamran from "../../../functions/main.js"
const router = express.Router();

router.get('/tfl-status', async (request, response) => {
    try {

        const responce = await kamran.database.getDatabase("7750a3bc-1372-4485-9581-8516193b3f6e");
        const data = responce.data;

        response.json(data);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
