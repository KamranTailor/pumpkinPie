document.getElementById("loading-content").innerHTML = "Loading User...";

window.onSpotifyWebPlaybackSDKReady = () => {
  document.getElementById("loading-content").innerHTML = "Loading Spotify Player...";
  player = new Spotify.Player({
      name: "Kamran Tailor's Website",
      getOAuthToken: cb => { cb(userData.linkedAccounts[0].spotify.accessToken); },
      volume: localStorage.getItem("volume") || 0.8
  });

  // Event listeners
  player.addListener('initialization_error', ({ message }) => console.error('Initialization Error:', message));
  player.addListener('authentication_error', ({ message }) => console.error('Authentication Error:', message));
  player.addListener('account_error', ({ message }) => console.error('Account Error:', message));
  player.addListener('playback_error', ({ message }) => console.error('Playback Error:', message));
  
  player.addListener('player_state_changed', state => {
      console.log('Player State Changed:', state);
      setPlayer(state);
  });

  player.addListener('ready', ({ device_id }) => {
      document.getElementById("loading-content").innerHTML = "Spotify Player Loaded!";
      console.log('Ready with Device ID:', device_id);
      transferPlaybackHere(device_id);
  });

  player.addListener('not_ready', ({ device_id }) => {
      console.log('Device has gone offline:', device_id);
  });

  // Connect to the player with enhanced logging
  const connectPlayer = () => {
      player.connect().then(success => {
          if (success) {
              console.log('Connected to Spotify Player');
          } else {
              console.error('Failed to connect to Spotify Player - Possible token issue or network problem.');
              alert('Could not connect to Spotify - please try again');
          }
      }).catch(error => {
          console.error('Connection error:', error);
      });
  };

  // Attempt to connect to the player immediately
  connectPlayer();
};

// Function to transfer playback to this web player
function transferPlaybackHere(deviceId) {
  document.getElementById("loading-content").innerHTML = "Transferring Player...";
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
  }).then(() => {
      player.pause().then(() => {
          console.log('Paused!');
      });
      setHomepage();
      document.getElementById("loader").style.display = "none";
      document.getElementById("player-container").style.display = "flex";
      document.getElementById("displayContent").style.display = "flex";
  }).catch(error => {
      console.error('Failed to transfer playback:', error);
  });
}

// Function to handle initial startup
async function onStart() {
  document.getElementById("loading-content").innerHTML = "Loaded User Data!";
  
  if (userData && userData.linkedAccounts && userData.linkedAccounts.length > 0) {
    const spotifyAccount = userData.linkedAccounts[0].spotify;

    // Ensure spotifyAccount is defined
    if (spotifyAccount) {
        const currentTime = Date.now();
        const accessTokenExpiration = spotifyAccount.accessTokenExpiration;

        // Refresh token if expired
        if (accessTokenExpiration && currentTime >= accessTokenExpiration) {
            try {
                const refreshTokenRes = await fetch('/spotify/refreshToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('email'),
                    })
                });

                const refreshData = await refreshTokenRes.json();

                // Update access token if successfully refreshed
                if (refreshData && refreshData.accessToken) {
                    userData.linkedAccounts[0].spotify.accessToken = refreshData.accessToken;
                    console.log('Token refreshed successfully:', refreshData.accessToken);
                } else {
                    console.error('Failed to refresh token.');
                    window.location = "/spotify/login";
                }

            } catch (error) {
                console.error('Error refreshing token:', error);
                window.location = "/spotify/login";
            }
        }

        document.getElementById("loading-content").innerHTML = "Waiting for Spotify Player...";
        window.onSpotifyWebPlaybackSDKReady();

    } else {
        window.location = "/spotify/login";
    }
  } else {
    window.location = "/spotify/login";
  }
}
