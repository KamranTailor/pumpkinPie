import express from 'express';
import kamran from "../../../functions/main.js";
const router = express.Router();
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

router.get('/directions', async (req, res) => {
    try {
        const { origin, destination } = req.query;

        const fetchResponse = await fetch(`https://api.tfl.gov.uk/journey/journeyresults/${origin}/to/${destination}?app_id=${process.env.TFL}`);
        const data = await fetchResponse.json();

        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
