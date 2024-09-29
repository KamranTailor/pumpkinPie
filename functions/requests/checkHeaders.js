// checkHeaders.js
import kamran from '../main.js';
import fetch from 'node-fetch';

export default async function checkHeaders(req, res, next) {
    try {
        const email = req.headers['email'];
        const clientKey = req.headers['session'];

        if (!email || !clientKey) {
            return res.status(400).json({ status: false, message: 'Missing email or session header' });
        }

        // Retrieve existing data (assuming it has a 'users' array)
        const userRes = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
        const users = userRes.data; 

        const sessionsRes = await kamran.database.getDatabase("007383ba-72af-42a1-b8ff-ac2f3f5a03ac");
        const sessions = sessionsRes.data;

        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        const session = sessions.find(s => s.userId === user.id && s.clientKey === clientKey);

        if (!session) {
            return res.status(401).json({ status: false, message: 'Invalid session' });
        }

        // Attach the user to the request object to use later in the route
        req.user = user;
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};
