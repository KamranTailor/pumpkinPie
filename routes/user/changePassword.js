import express from 'express';
import kamran from '../../functions/main.js';
import bcrypt from 'bcrypt'; 
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { id, newPassword, oldPassword } = request.body;

        // Check if all necessary fields are provided
        if (!id || !newPassword || !oldPassword) {
            return response.status(400).json({ status: false, message: 'Missing required fields' });
        }

        // Retrieve existing data (assuming it has a 'users' array)
        const userRes = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
        const users = userRes.data;

        // Find the user by ID
        const user = users.find(user => user.id === id);
        if (!user) {
            return response.status(404).json({ status: false, message: 'User not found' });
        }

        // Ensure the stored password is available
        if (!user.password) {
            return response.status(500).json({ status: false, message: 'User has no password set' });
        }

        // Compare the plain old password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ status: false, message: 'Invalid old password' });
        }

        // Hash the new password before saving it
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        // Update user in the database
        const updatedData = { ...user, password: hashedNewPassword };
        const send = await kamran.database.editEntry("b59b7631-f435-4189-b2ab-0c26a27def85", id, updatedData);

        // Check if the update was successful
        if (send.status === true) {
            return response.json({ status: true, message: 'Password updated successfully' });
        } else {
            return response.status(500).json({ status: false, message: 'Error updating password in database' });
        }

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
