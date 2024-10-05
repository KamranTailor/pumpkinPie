import express from 'express';
import kamran from '../../functions/main.js';
const router = express.Router();
import fetch from 'node-fetch';

router.post('/', async (request, response) => {
    const { id } = request.body;

    const session = await kamran.sessions.deleteSession(id);
    response.json({status: true});
});

export default router;
