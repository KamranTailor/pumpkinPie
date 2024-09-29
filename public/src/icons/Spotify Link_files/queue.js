async function addToQueue(id) {
    const url = `https://api.spotify.com/v1/me/player/queue?uri=${id}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert("Error adding item to queue");
        }
        viewQueue()
    } catch (err) {
        console.log(err);
    }
}

async function viewQueue() {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/queue', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        let content = "";
        const nextTracks = data.queue;

        if (nextTracks.length === 0) {
            content = "The queue is currently empty.";
        } else {
            content += `<div class="song-queue"><ul>`
            for (let i in nextTracks) {
                const track = nextTracks[i];
                content += `
                <li class="song-item">
                    <img src="${track.album.images[0].url}" class="cover-image">
                    <div class="song-details">
                        <h3 class="song-title">${track.name}</h3>
                        <p class="artist-name">${track.artists[0].name}</p>
                    </div>
                </li>`; // Customize this line as needed
            }
            content += "</ul></div>"
        }

        openPopUp("Queue", false, content)
    } catch (e) {
        console.log(e);
        alert("An error occurred while viewing the queue.");
    }
}
