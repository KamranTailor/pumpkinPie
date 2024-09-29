import express from 'express';
import kamran from '../../functions/main.js';
import bcrypt from 'bcrypt'; 
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

router.get('/', async (request, response) => {
    try {

        // Retrieve existing data (assuming it has a 'users' array)
        const userRes = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
        const users = userRes.data; 

        for (let i in users) {
          delete users[i].password;
        }
    
        return response.json({ status: true, message: 'Session Correct', user: users });

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
