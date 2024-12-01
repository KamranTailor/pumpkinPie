async function openTrack(id) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`,
          'Content-Type': 'application/json'
      }
  });
  const songData = await response.json();
  console.log(songData);
  const songText = `
  <button class="button" id="addToPlaylist" onclick="addToPlaylist('${songData.uri}')">Add to Playlist</button>
  <button class="button" id="addToQueue" onclick="addToQueue('${songData.uri}')">Add to Queue</button> <br>
      <strong>Track Name:</strong> ${songData.name} <br>
      <strong>Duration (ms):</strong> ${songData.duration_ms}<br>
      <strong>Popularity:</strong> ${songData.popularity}<br>
      <strong>Explicit:</strong> ${songData.explicit ? 'Yes' : 'No'}<br>
      <strong>Album:</strong> ${songData.name}<br>
      <strong>Release Date:</strong> ${songData.album.release_date}<br>
      <strong>Total Tracks:</strong> ${songData.album.total_tracks}<br>
  `;

  openPopUp(songData.name, songData.album.images[0].url, songText)

}