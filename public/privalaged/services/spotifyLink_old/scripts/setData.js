function setUserInfo(info) {
    let url = "./userIcon.jpeg"; // Default URL

    if (info.images && info.images.length > 1 && info.images[1].url) {
        url = info.images[1].url;
    } else if (info.images && info.images.length > 0 && info.images[0].url) {
        url = info.images[0].url;
    }

    const toSet = `
    <img src="${url}" alt="User Profile">
    <h2>${info.display_name}</h2>
    <p>${capitalizeFirstLetter(info.product)} Member</p>
    <p>Country: ${info.country}</p>`;
    
    document.getElementById("profile-card").innerHTML = toSet;
}

function setArtists(items) {
    let i = 0;  // Initialize i to 0

    while (i < 4) {  // Change the condition to check if i is less than 4
        let artist = items[i];
        let artistDiv = document.createElement("p");
        artistDiv.className = "artist";
        artistDiv.innerHTML = `
            <img src="${artist.images[2].url}" alt="Artist Img">
            ${artist.name} ${artist.popularity}%
        `;
        document.getElementById("topArtists").appendChild(artistDiv);
        i++;
    }
}


function setTracks(items) {
    let i = 0;  // Initialize i to 0

    while (i < 4) {  // Change the condition to check if i is less than 
        let track = items[i];
        let div = document.createElement("p");
        div.className = "artist";
        div.innerHTML = `
            <img src="${track.album.images[2].url}" alt="Artist Img">
            ${track.name} ${track.popularity}%
        `;
        document.getElementById("topTracks").appendChild(div);
        i++;
    }
}

function capitalizeFirstLetter(str) {
    if (str.length === 0) return str; // Return the string as is if it's empty
    return str.charAt(0).toUpperCase() + str.slice(1);
}
