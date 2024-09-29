async function onStart() {
    // Check if userData and linkedAccounts are defined and not empty
    if (userData && userData.linkedAccounts && userData.linkedAccounts.length > 0) {
        const spotifyAccount = userData.linkedAccounts[0].spotify;

        // Ensure spotifyAccount is defined
        if (spotifyAccount) {
            const currentTime = Date.now();
            const accessTokenExpiration = spotifyAccount.accessTokenExpiration;

            if (accessTokenExpiration && currentTime >= accessTokenExpiration) {
                const refreshTokenRes = response = await fetch('/spotify/refreshToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('email'),
                    })
                });
                const refreshData = await refreshTokenRes.json();
                console.log(refreshData)
            }

            const data = response = await fetch('/spotify/data', {
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
            const spotifyData = await data.json();
            console.log(spotifyData)

            setArtists(spotifyData.topArtists.items)
            setTracks(spotifyData.topTracks.items)
            setUserInfo(spotifyData.userInfo)
            //startPlayer()

            
        } else {
            window.location= "/spotify/login";
        }
    } else {
        window.location= "/spotify/login";
    }

    // Additional code for handling when login is not needed can go here
}

function toggleMode() {
    document.body.classList.toggle('light-mode');
}

function viewStats() {
    document.getElementById('statsDisplay').style.display = 'block';
    document.getElementById('discovery-display').style.display = 'none';
}

function viewDiscovery() {
    document.getElementById('statsDisplay').style.display = 'none';
    document.getElementById('discovery-display').style.display = 'block';
}