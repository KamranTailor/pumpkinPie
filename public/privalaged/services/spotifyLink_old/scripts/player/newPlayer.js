// Initialize the Spotify player
let player;
let duration = 0;
window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
        name: "Kamran Tailor's Website",
        getOAuthToken: cb => { cb(userData.linkedAccounts[0].spotify.accessToken); },
        volume: localStorage.getItem("volume") || 0.8
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error('Initialization Error:', message); });
    player.addListener('authentication_error', ({ message }) => { console.error('Authentication Error:', message); });
    player.addListener('account_error', ({ message }) => { console.error('Account Error:', message); });
    player.addListener('playback_error', ({ message }) => { console.error('Playback Error:', message); });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log('Player State Changed:', state);
        setTrackDetails()
        setPlayerControls(state);
    });

    // Ready event
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID:', device_id);

        // Automatically transfer playback to this player
        transferPlaybackHere(device_id);
        initializeSpotifySocket()
        pause()
    });

    // Not ready event
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device has gone offline:', device_id);
    });

    // Connect to the player
    player.connect();
}

// Function to transfer playback to this web player
function transferPlaybackHere(deviceId) {
    fetch(`https://api.spotify.com/v1/me/player`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`
        },
        body: JSON.stringify({
            "device_ids": [deviceId],
            "play": true
        })
    });
}
