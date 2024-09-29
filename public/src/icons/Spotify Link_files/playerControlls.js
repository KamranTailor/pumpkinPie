// Fast backward button
document.querySelector('img[src="/src/icons/fast-backward.png"]').addEventListener('click', function () {
    console.log('Fast backward clicked');
    player.previousTrack().then(() => {
        console.log('Set to previous track!');
      });
});

document.querySelector('img[src="/src/icons/fast-forward.png"]').addEventListener('click', function () {
    console.log('Fast forward clicked');
    player.nextTrack().then(() => {
        console.log('Skipped to next track!');
      });
});


// Repeat off button
document.getElementById('repeat-off').addEventListener('click', function () {
    console.log('Repeat off clicked');
    // Add your logic here
});

// Repeat track button
document.getElementById('repeat-on').addEventListener('click', function () {
    console.log('Repeat track clicked');
    // Add your logic here
});

// Play button
document.getElementById('play').addEventListener('click', function () {
    console.log('Play button clicked');
    player.resume().then(() => {
        console.log('Resumed!');
    });
});

// Pause button
document.getElementById('pause').addEventListener('click', function () {
    console.log('Pause button clicked');
    player.pause().then(() => {
        console.log('Paused!');
    });
});

// Shuffle off button
document.getElementById('shuffle-off').addEventListener('click', function () {
    console.log('Shuffle off clicked');
    // Add your logic here
});

// Shuffle on button
document.getElementById('shuffle-on').addEventListener('click', function () {
    console.log('Shuffle on clicked');
    // Add your logic here
});

