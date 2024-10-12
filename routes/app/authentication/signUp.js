import express from 'express';
import kamran from '../../../functions/main.js';
import bcrypt from 'bcrypt'; // Ensure to install bcrypt for password hashing
const router = express.Router();

let stagingAccounts = [];

router.post('/', async (request, response) => {
    try {
        const { email, password, confirmPassword, firstName, lastName } = request.body;

        // Validate password match
        if (confirmPassword !== password) {
            return response.status(400).json({ status: false, message: 'Passwords do not match' });
        }

        // Retrieve existing data
        const existingData = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");

        // Check if email already exists
        for (const user of existingData.data) {
            if (user.email === email) {
                return response.status(400).json({ status: false, message: 'Email already exists' });
            }
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Prepare new user object
        const baseTimestamp = new Date(); // Starting timestamp

        let handle = (firstName + lastName).toLowerCase();
        let isUnique = false;

        while (!isUnique) {
            isUnique = true;  // Assume it's unique until proven otherwise
            
            for (const user of existingData.data) {
                if (user.handle === handle) {
                    handle += "1"; 
                    isUnique = false;  
                    break;  
                }
            }
        }

        const internalEmail = `${handle}@mail.kamrantailor.com`;
        const timestamp = Date.now();
        const lastLogin = Date.now(); 
        const properties = [];
        const linkedAccounts = [];
        const history = [
            { timestamp: new Date(baseTimestamp), service: "tubeTime" },
            { timestamp: new Date(baseTimestamp.getTime() + 2000), service: "aviation" }, 
            { timestamp: new Date(baseTimestamp.getTime() + 5000), service: "settings" }, 
            { timestamp: new Date(baseTimestamp.getTime() + 8000), service: "messages" }, 
        ];
        const messages = [];
        const accessLevel = 0;

        const newUser = { 
            email, 
            password: hashedPassword, // Store hashed password
            firstName, 
            lastName, 
            timestamp, 
            accessLevel, 
            lastLogin, 
            properties,
            linkedAccounts,
            history,
            messages,
            internalEmail,
            handle
        };

        // Add new user to the database
        const addUser = await kamran.database.addEntry("b59b7631-f435-4189-b2ab-0c26a27def85", newUser);
        
        // Check if the user was successfully added
        if (addUser.status === true) { 
            response.json({ status: true, message: 'User created!', user: {handle, email, firstName} });
        } else {
            response.status(500).json({ status: false, message: 'Failed to create user' });
        }
        
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
