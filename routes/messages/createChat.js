import express from 'express';
import kamran from '../../functions/main.js';
import bcrypt from 'bcrypt'; // Ensure to install bcrypt for password hashing
const router = express.Router();

let stagingAccounts = [];

router.post('/', async (request, response) => {
    try {
        const { chatName, members, groupCreater } = request.body;

        const existingData = await kamran.database.getDatabase("2710d83c-0fa6-4f8f-afaf-2ca304fe894");

        for (let i in existingData.data) {
            if (existingData.data[i].chatName == chatName) {
                return response.status(400).json({ status: false, message: 'Chat name already exists' });
            }
        }

        const newChat = {
            chatName,
            members,
            groupCreater,
            messages: []
        }

        const addChat = await kamran.database.addEntry("2710d83c-0fa6-4f8f-afaf-2ca304fe894", newChat);
        response.json({status:true, data: addChat.newArray})
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
