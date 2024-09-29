const searchInput = document.getElementById("search");
const searchResults = document.getElementById("searchResults");
const searchButton = document.getElementById("searchButton");
searchResults.style.display = "none";

searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
        searchResults.style.display = "none";
    }
});

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && searchInput.value.trim() !== "") {
        searchResults.style.display = "block";
        search()
    }
});


searchButton.addEventListener("click", function () {
    if (searchInput.value.trim() !== "") {
        searchResults.style.display = "block";
        search()
    }
});

async function search() {
    console.log(searchInput.value)
    const encodedSearchString = encodeURIComponent(searchInput.value);
    console.log(encodedSearchString);

    const url = `https://api.spotify.com/v1/search?q=${encodedSearchString}&type=album,playlist,artist,track&limit=10`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userData.linkedAccounts[0].spotify.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);

        let tracks = "";
        let artists = "";
        let playlists = "";
        let albums = "";

        let i = 0;
        while (i < 8) {
            let genres = data.artists.items[i].genres
                .map(genre => capitalizeFirstLetter(genre))
                .slice(0, 2)
                .join(", ");

            artists += `<div class="artist">
            <img class="artistImg" src='${data.artists.items[i].images[0].url || ""}' />
            <p class="artist-name">${data.artists.items[i].name}</p>
            <p class="artist-genres">${genres}</p>
            </div>`

            playlists += `<div class="playlist-item" onclick="openPlaylist('${data.playlists.items[i].id}')">
            <img class="playlistImg" src='${data.playlists.items[i].images[0].url}' />
            <p class="playlist-name">${data.playlists.items[i].name}</p>
            </div>`;

            tracks += `<div class="track-item" onclick="openTrack('${data.tracks.items[i].id}')">
            <img class="trackImg" src='${data.tracks.items[i].album.images[0].url}' />
            <p class="track-name">${data.tracks.items[i].name}</p>
            <p class="artist-name-rec">${data.tracks.items[i].artists.map(artist => artist.name).join(' ')}</p>
            </div>`;

            albums += `<div class="playlist-item" onclick="openAlbum('${data.albums.items[i].id}')">
            <img class="playlistImg" src='${data.albums.items[i].images[0].url}' />
            <p class="playlist-name">${data.albums.items[i].name}</p>
            <p class="artist-name-rec">${data.albums.items[i].artists.map(artist => artist.name).join(' ')}</p>
            </div>`;

            if (i == 0) {
                document.getElementById('overall-search').innerHTML = `${artists} ${tracks} ${albums} ${playlists}`
            }
            i++;
        }

        document.getElementById("artists").innerHTML = artists;
        document.getElementById("playlists").innerHTML = playlists;
        document.getElementById("tracks").innerHTML = tracks;
        document.getElementById("albums").innerHTML = albums;
        openTab('overall-search');
    } catch (e) {
        console.log(e);
    }
}

function openTab(tabName) {
    // Hide all tab contents
    var i, tabContent;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    
    // Remove active class from all buttons
    var tabButtons = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    // Show the selected tab content
    document.getElementById(tabName).style.display = "grid";
}