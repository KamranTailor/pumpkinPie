import express from 'express';
import kamran from '../../functions/main.js';
import bcrypt from 'bcrypt'; 
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

router.post('/', async (request, response) => {
    try {
        const { id, newData } = request.body;

        // Retrieve existing data (assuming it has a 'users' array)
        const userRes = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
        const users = userRes.data; 
        
        let updatedData;
        for (let i in users) {
            if (users[i].handle == newData.handle) {
                if (newData.handle != newData.oldHandle) {
                    return response.status(400).json({ status: false, message: 'Handle already in use' });
                }
            }

            if (users[i].id == id) {
                updatedData = users[i];
                updatedData.firstName = newData.firstName;
                updatedData.lastName = newData.lastName;
                updatedData.handle = newData.handle;
                updatedData.email = newData.email;
                updatedData.internalEmail = `${newData.handle}@mail.kamrantailor.com`;
                break;
            }
        }

        const send = await kamran.database.editEntry("b59b7631-f435-4189-b2ab-0c26a27def85", id ,updatedData);

        if (send.status == true) {
            return response.json({ status: true});
        } else {
            return response.status(500).json({ status: false , message: 'Error sending to database'});
        }

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
