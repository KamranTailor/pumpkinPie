import express from 'express';
import kamran from '../../functions/main.js';
const router = express.Router();
import fetch from 'node-fetch';

router.post('/', async (request, response) => {
  try {
    const { id } = request.body;
    
    const dataEnt = await kamran.database.deleteEntry("b59b7631-f435-4189-b2ab-0c26a27def85", id )
    
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
