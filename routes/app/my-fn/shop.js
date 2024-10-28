// app/my-fn/shop.js

import express from 'express';
import kamran from '../../../functions/main.js';
const router = express.Router();

router.get('/', async (request, response) => {
    try {

        const responce = await kamran.database.getDatabase("d0663c45-efb8-4149-8ef6-ef2273e47f45");
        const data = responce.data;

        response.json(data);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
