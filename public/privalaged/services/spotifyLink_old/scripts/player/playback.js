async function play(trackUri = null) {
    const body = trackUri ? JSON.stringify({ "uris": [trackUri] }) : null;

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`
            },
            body: body
        });

        resumeBar()
    } catch (err) {
        console.error('Error starting or resuming playback:', err);
    }
}

// Function to pause playback
async function pause() {
    try {
        await fetch(`https://api.spotify.com/v1/me/player/pause`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`
            }
        });
        
        
        pauseBar()
        console.log('Playback paused.');
    } catch (err) {
        console.error('Error pausing playback:', err);
    }
}

async function nextTrack() {
    player.nextTrack().then(() => {
        console.log('Skipped to next track!');
    });
}

async function previousTrack() {
    player.previousTrack().then(() => {
        console.log('Skipped to previous track!');
    });
}