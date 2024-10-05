import express from 'express';
import kamran from '../../functions/main.js';
const router = express.Router();
import fetch from 'node-fetch';

router.post('/', async (request, response) => {
  try {
    const { id } = request.body;

    const userRes = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
    const users = userRes.data;
    const sessionsRes = await kamran.database.getDatabase("007383ba-72af-42a1-b8ff-ac2f3f5a03ac");

    let newUser;
    for (let i in users) {
      if (String(users[i].id) === String(id)) {
        newUser = users[i];
        delete newUser.linkedAccounts[0].spotify;

      }
    }

    const dataEnt = await kamran.database.editEntry("b59b7631-f435-4189-b2ab-0c26a27def85", id ,newUser)
    
    if (dataEnt.status) {
      return response.json({ status: true});
    } else {
      return response.status(500).json({ status: false, message: 'Failed to update user' });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    response.status(500).json({ status: false, message: 'Internal server error' });
  }
});

export default router;
