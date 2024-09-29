// sockets/main.js

const users = {}; // To store connected users by their ID

export default function initializeSocket(io) {
    const messages = [];

    io.on('connection', (socket) => {
        console.log('A user connected');

        // When a user logs in, save their socket by their ID
        socket.on('register', (user) => {
            users[user.id] = socket;
            socket.userId = user.id; // Store the user ID in the socket for disconnection tracking
        });

        // Send existing message history to the newly connected client
        socket.emit('message-history', messages);

        // Handle incoming messages
        socket.on('message', (msgData) => {
            const { senderId, senderHandle, recipientId, text } = msgData;

            if (recipientId) {
                // Private message
                if (users[recipientId]) {
                    const privateMessage = {
                        senderHandle: senderHandle,
                        text: text,
                        recipientId: recipientId
                    };
                    // Send the message to the recipient only
                    users[recipientId].emit('message', privateMessage);
                }
            } else {
                // Public message (broadcast to all clients)
                const publicMessage = {
                    senderHandle: senderHandle,
                    text: text
                };
                messages.push(publicMessage);
                io.emit('message', publicMessage); // Broadcast the message to all clients
            }
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
            delete users[socket.userId]; // Remove the user from the list of connected users
        });
    });
}
