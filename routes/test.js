import express from 'express';
const router = express.Router();

let stagingAccounts = [];

router.post('/', async (request, response) => {
    try {
        response.json({status:true})
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
