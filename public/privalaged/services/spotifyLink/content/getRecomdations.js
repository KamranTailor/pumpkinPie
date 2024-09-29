let spotifyData;

async function setHomepage() {
    try {
        const response = await fetch('/spotify/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                email: localStorage.getItem('email'),
                session: localStorage.getItem('session')
            },
            body: JSON.stringify({
                accessToken: userData.linkedAccounts[0].spotify.accessToken,
            })
        });
        spotifyData = await response.json();
        console.log(spotifyData);

        populateArtists(spotifyData.topArtists.items);
        populatePlaylists(spotifyData.playlists.items);
        //populateTracks(spotifyData.recommendations.tracks);
        
    } catch (error) {
        console.error(error);
    }
}

function populateArtists(artistsData) {
    let artistsHTML = "";
    artistsData.slice(0, 9).forEach(artist => {
        let genres = artist.genres
            .map(genre => capitalizeFirstLetter(genre))
            .slice(0, 2)
            .join(", ");

        artistsHTML += `<div class="artist">
            <img class="artistImg" src='${artist.images[0].url}' />
            <p class="artist-name">${artist.name}</p>
            <p class="artist-genres">${genres}</p>
        </div>`;
    });
    artistsHTML += getViewMoreButton('viewAllArtists');
    document.getElementById("artist-container").innerHTML = artistsHTML;
}

function populatePlaylists(playlistsData) {
    let playlistsHTML = "";
    playlistsData.slice(0, 9).forEach(playlist => {
        playlistsHTML += `<div class="playlist-item" onclick="openPlaylist('${playlist.id}')">
            <img class="playlistImg" src='${playlist.images[0].url}' />
            <p class="playlist-name">${playlist.name}</p>
            <p class="playlist-tracks">${playlist.tracks.total} Tracks</p>
        </div>`;
    });
    playlistsHTML += getViewMoreButton('viewAllPlaylists');
    document.getElementById('playlist-container').innerHTML = playlistsHTML;
}

function populateTracks(tracksData) {
    let tracksHTML = "";
    tracksData.slice(0, 9).forEach(track => {
        let artists = track.artists.map(artist => artist.name).join(' ');
        
        tracksHTML += `<div class="track-item" onclick="openTrack('${track.id}')">
            <img class="trackImg" src='${track.album.images[0].url}' />
            <p class="track-name">${track.name}</p>
            <p class="artist-name-rec">${artists}</p>
        </div>`;
    });
    tracksHTML += getViewMoreButton('viewAllTracks');
    document.getElementById('recomendations-container').innerHTML = tracksHTML;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getViewMoreButton(onClickFunction) {
    return `<div class="artist" onclick="${onClickFunction}()">
        <img class="artistImgMore" src='/src/icons/more-large.png' />
        <p class="artist-name">View More</p>
    </div>`;
}
