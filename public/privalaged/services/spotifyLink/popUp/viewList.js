async function openPlaylist(id) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const songData = await response.json();
  console.log(songData);
  let content = `<button class="button" id="addToPlaylist" onclick="playFromUri('${songData.uri}')">Play</button> <br>
  <div class="song-queue"><ul>`
  for (let i in songData.tracks.items) {
    const track = songData.tracks.items[i];
    content += `
    <li class="song-item">
    <img src="${track.track.album.images[0].url}" class="cover-image">
    <div class="song-details">
    <h3 class="song-title">${track.track.name}</h3>
    <p class="artist-name">${track.track.artists[0].name}</p>
    </div>
    </li>`; 
  }
  content += "</ul></div>"

  openPopUp(songData.name, songData.images[0].url, content)

}

async function openAlbum(id) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const songData = await response.json();
    console.log(songData);
    let content = `<button class="button" id="addToPlaylist" onclick="playFromUri('${songData.uri}')">Play</button> <br>
    <div class="song-queue"><ul>`
    for (let i in songData.tracks.items) {
      const track = songData.tracks.items[i];
      content += `
      <li class="song-item">
      <img src="${track.track.album.images[0].url}" class="cover-image">
      <div class="song-details">
      <h3 class="song-title">${track.track.name}</h3>
      <p class="artist-name">${track.track.artists[0].name}</p>
      </div>
      </li>`; 
    }
    content += "</ul></div>"
  
    openPopUp(songData.name, songData.images[0].url, content)
  
  }

async function playFromUri(playlistUri) {
    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            context_uri: playlistUri
        })
    });

    if (response.ok) {
        console.log('Playlist is now playing.');
    } else {
        console.error('Error playing playlist:', response.statusText);
    }
}