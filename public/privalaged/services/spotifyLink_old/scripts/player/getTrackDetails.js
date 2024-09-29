// Function to get and log details about the currently playing song
async function setTrackDetails() {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error.message}`);
        }

        const data = await response.json();
        console.log(data)
        if (data && data.item) {
            const track = data.item;

            if (document.getElementById('songName').value != data.item.name) {
                document.getElementById('song-playing').src = data.item.album.images[0].url;
                document.getElementById('songName').textContent = data.item.name;
                document.getElementById('songBy').textContent = track.artists.map(artist => artist.name).join(' & ');
                document.title = data.item.name;

                let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = data.item.album.images[0].url;
                document.getElementsByTagName('head')[0].appendChild(link);
            }

            setProgressBarLength(data.item.duration_ms, data.progress_ms)
            socket.emit("requestSpotifyData", { type: "currentTrack" });
        } else {
            console.log('No track is currently playing.');
        }
    } catch (error) {
        console.error('Error fetching current track details:', error);
    }
}
