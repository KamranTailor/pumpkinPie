import express from 'express';
import kamran from '../../../functions/main.js';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed for password hashing
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

router.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        // Retrieve existing data (assuming it has a 'users' array)
        const databaseData = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
        const users = databaseData.data; // Assuming `users` is the array of user records

        // Check if the user with the given email exists
        const user = users.find(user => user.email === email);
        if (!user) {
            return response.status(400).json({ status: false, message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(400).json({ status: false, message: 'Invalid password' });
        } 

        // Login success - you can return user info or session data here
        response.json({ status: true, 
            message: 'Login successful', 
            user: { email: user.email, firstName: user.firstName, lastName: user.lastName}
        });

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
