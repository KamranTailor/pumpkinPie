import express from 'express';
import kamran from '../../functions/main.js';
const router = express.Router();
import fetch from 'node-fetch';

router.post('/', async (request, response) => {
  try {
    const { id, userData } = request.body;
    
    const database = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85")
    const data = database.data;

    for (let i in data) {
        if (data[i].id === id) {
            data[i].firstName = userData.firstName;
            data[i].lastName = userData.lastName;
            data[i].email = userData.email;
            data[i].handle = userData.handle
            data[i].accessLevel = userData.accessLevel;
            data[i].internalEmail = userData.internalEmail;

            const updatedData = await kamran.database.editEntry("b59b7631-f435-4189-b2ab-0c26a27def85", id, data[i]);
            const dataEnt = updatedData.status;

            if (dataEnt) {
              return response.json({ status: true});
            } else {
              return response.status(500).json({ status: false, message: 'Failed to update user' });
            }
        }
    }

  } catch (error) {
    console.error('Error processing request:', error);
    response.status(500).json({ status: false, message: 'Internal server error' });
  }
});

export default router;
