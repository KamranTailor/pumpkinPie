async function setChat() {
    try {
        const response = await fetch('/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('email'),
                clientKey: localStorage.getItem('session')
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        console.log(userData)
        const { userId, handle } = userData.user;
        const channels = userData.user.messages.channels;
        
        // Initialize messaging with fetched user data
        const socket = io(); // Connect to the server using socket.io

        const form = document.getElementById('form');
        const input = document.getElementById('input');
        const messages = document.getElementById('messages');
        const recipientSelect = document.getElementById('recipient');

        // Load message history when connected
        socket.on('message-history', (history) => {
            history.forEach((msg) => {
                addMessage(msg)
            });
            messages.scrollTop = messages.scrollHeight; // Smooth scrolling
        });

        // Handle sending public and private messages
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from submitting
            const recipientId = recipientSelect.value; // Get the recipient
            const message = input.value.trim(); // Trim whitespace

            if (message) {
                const msgData = {
                    senderId: userId,
                    senderHandle: handle, // Send the handle instead of the name
                    recipientId, // This can be empty for public messages
                    text: message
                };
                socket.emit('message', msgData); // Send message to server
                input.value = ''; // Clear the input field
            } else {
                // Optional: Add feedback for empty input
                alert('Please enter a message.');
            }
        });

        // Receive new messages
        socket.on('message', (msg) => {
            addMessage(msg); 
            messages.scrollTop = messages.scrollHeight; // Smooth scrolling
        });

        function addMessage(msg) {
            const item = document.createElement('li');
            
            // Check if the message is from the current user
            if (msg.handle === handle) {
                item.classList.add('user-message'); // Add class for user messages
                item.innerHTML = `
                    <span class="sender">@${msg.senderHandle}</span>
                    <span class="message-text">${msg.text}</span>`;
            } else {
                item.classList.remove('user-message'); // Ensure class is not added
                item.innerHTML = `
                    <span class="sender">@${msg.senderHandle}</span>
                    <span class="message-text">${msg.text}</span>`;
            }

            messages.appendChild(item);
            messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};
