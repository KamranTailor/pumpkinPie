export default async function initializeSocket(io) {
    io.on('connection', (socket) => {

        // Handle receiving the authCode from the client
        socket.on('sendAuthCode', (accessToken) => {
            // Store the authCode directly in the socket object
            socket.accessToken = accessToken;
        });

        // Handle Spotify data request
        socket.on('requestSpotifyData', async (params) => {
            try {
                // Retrieve the authCode stored in the socket
                const accessToken = socket.accessToken;
                if (!accessToken) {
                    throw new Error('No authCode found for this client');
                }

                const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                const responsetwo = await fetch("https://api.spotify.com/v1/me/player", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const datatwo = await responsetwo.json();

                const toSend = {
                    queue: data.queue,
                    currently_playing: data.currently_playing,
                    currentState: datatwo
                }
                socket.emit('spotifyDataResponse', toSend);
            } catch (error) {
                console.error('Error fetching Spotify data:', error);
                socket.emit('error', 'Failed to retrieve Spotify data');
            }
        });
    });
}
