// app/my-fn/shop.js

import express from 'express';

const router = express.Router();

router.get('/shop', async (request, response) => {
    try {
        const filePath = '../database/fortnite/itemShop.json';

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
