function setQueue(queue) {
    document.getElementById("queue-list").innerHTML = "";
    console.log(queue);
    let i = 0;
    while (10 > i) {
        const item = queue[i];
        const div = document.createElement("li");
        div.className = "queue-item";
        
        div.innerHTML = `
                      <img src="${item.album.images[2].url}" alt="Song" class="song-image">
                      <div class="song-info">
                          <p class="song-title">${item.name}</p>
                          <p class="song-artist">${item.artists.map(artist => artist.name).join(' & ')}</p>
                      </div>
        `;
        document.getElementById("queue-list").appendChild(div);
        i++;
    }
}

let queueDisplayed = false;
function toggleQueue() {
    if (queueDisplayed) {
        document.getElementById("song-queue").style.display = "none";
        queueDisplayed = false;
    } else {
        document.getElementById("song-queue").style.display = "block";
        queueDisplayed = true;
    }
}
