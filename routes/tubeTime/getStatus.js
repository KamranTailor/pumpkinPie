import express from 'express';
import kamran from '../../functions/main.js';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed for password hashing
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

router.get('/', async (request, response) => {
    try {
        const data = await kamran.database.getDatabase("7750a3bc-1372-4485-9581-8516193b3f6e");
        if (data.status == true) {
            response.json({ status: true, data: data.data });
        } else {
            response.status(404).json({ status: false, message: 'Database not responding' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
