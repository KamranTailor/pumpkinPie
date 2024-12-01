function setPlayer(state) {
    if (document.getElementById("song-title").value != state.track_window.current_track.name) {
        document.getElementById('song-title').innerHTML = state.track_window.current_track.name;
        document.getElementById('song-artist').innerHTML = state.track_window.current_track.artists.map(artist => artist.name).join(' & ');

        document.getElementById('song-cover').src = state.track_window.current_track.album.images[0].url;
        newSong()
    }

    if (state.track_window.next_tracks && state.track_window.next_tracks.length > 0) {
        const nextTrack = state.track_window.next_tracks[0]; // Get the first next track
    
        if (document.getElementById('next-song').src !== nextTrack.album.images[1].url) {
            document.getElementById('next-song').style.display = 'block'; // Use style.display
            document.getElementById('next-song').src = nextTrack.album.images[1].url;
        }
    } else {
        document.getElementById('next-song').style.display = 'none'; // Use style.display
    }
    
    if (state.track_window.previous_tracks && state.track_window.previous_tracks.length > 0) {
        const prevTrack = state.track_window.previous_tracks[0]; // Get the first previous track
    
        if (document.getElementById('prev-song').src !== prevTrack.album.images[1].url) {
            document.getElementById('prev-song').style.display = 'block'; // Use style.display
            document.getElementById('prev-song').src = prevTrack.album.images[1].url;
        }
    } else {
        document.getElementById('prev-song').style.display = 'none'; // Use style.display
    }
    

    setCurrentSongDuration(state.position)
    setTotalSongDuration(state.duration)

    if (state.paused) {
        document.getElementById('play').style.display = 'block';
        document.getElementById('pause').style.display = 'none';
        paused()
    } else {
        document.getElementById('pause').style.display = 'block';
        document.getElementById('play').style.display = 'none';
        playing()
    }

    if (state.repeat_mode === 0) {
        document.getElementById('repeat-off').style.display = 'block';
        document.getElementById('repeat-on').style.display = 'none';
    } else {
        document.getElementById('repeat-off').style.display = 'none';
        document.getElementById('repeat-on').style.display = 'block';
    }

    if (state.shuffle) {
        document.getElementById('shuffle-on').style.display = 'none';
        document.getElementById('shuffle-off').style.display = 'block';
    } else {
        document.getElementById('shuffle-on').style.display = 'block';
        document.getElementById('shuffle-off').style.display = 'none';
    }

}