import express from 'express';
import kamran from '../../functions/main.js';
import bcrypt from 'bcrypt'; 
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

router.post('/', async (request, response) => {
    try {
        const { email, clientKey } = request.body;  // Fix typo

        // Retrieve existing data (assuming it has a 'users' array)
        const userRes = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
        const users = userRes.data; 

        const sessionsRes = await kamran.database.getDatabase("007383ba-72af-42a1-b8ff-ac2f3f5a03ac");
        const sessions = sessionsRes.data;

        const user = users.find(u => u.email === email);

        if (!user) {
            return response.status(404).json({ status: false, message: 'User not found' });
        }

        const session = sessions.find(s => s.userId === user.id && s.clientKey === clientKey);

        if (!session) {
            return response.status(401).json({ status: false, message: 'Invalid session' });
        }

        // Remove sensitive data before returning
        const { password, ...safeUser } = user;
        return response.json({ status: true, message: 'Session Correct', user: safeUser });

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
