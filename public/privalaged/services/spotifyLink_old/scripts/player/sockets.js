let socket; // Declare the socket variable globally, but initialize it later

function initializeSpotifySocket() {
    // Initialize the socket connection to the server
    socket = io();

    // Send the authCode right after the client connects
    socket.on("connect", () => {
        const accessToken = userData.linkedAccounts[0].spotify.accessToken; // Replace with actual access token
        socket.emit("sendAuthCode", accessToken);
    });

        //socket.emit("requestSpotifyData", { type: "currentTrack" });

    // Handle receiving data
    socket.on("spotifyDataResponse", (data) => {
        setQueue(data.queue)
        setState(data.currentState)
    });

    document.getElementById("playerDisplay").style.display = "block"
    document.getElementById("discovery-display").style.display = "block"
    document.getElementById("loader").style.display = "none"
    // Handle errors
    socket.on("error", (errorMessage) => {
        console.error("Error from server:", errorMessage);
    });
}


