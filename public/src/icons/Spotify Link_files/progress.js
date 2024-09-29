let musicPlaying = false;
let totalSongDurationSeconds = 0;
let currentSongDurationSeconds = 0;
let playbackInterval; // Store the playback interval ID

function playing() {
  if (!musicPlaying) {
    musicPlaying = true;
    playMusic();
  }
}

function paused() {
  musicPlaying = false;
  clearInterval(playbackInterval); // Clear the interval when paused
}

function setTotalSongDuration(durationMs) {
  totalSongDurationSeconds = Math.floor(durationMs / 1000); // Convert ms to seconds
  document.getElementById('total-time').innerHTML = secondsToTime(totalSongDurationSeconds);
}

function setCurrentSongDuration(durationMs) {
  currentSongDurationSeconds = Math.floor(durationMs / 1000); // Convert ms to seconds
  updateDisplay();
}

function playMusic() {
  playbackInterval = setInterval(() => {
    if (musicPlaying) {
      currentSongDurationSeconds++;
      updateDisplay();
    } else {
      clearInterval(playbackInterval); // Clear the interval if music is paused
    }
  }, 1000);
}

function newSong() {
  currentSongDurationSeconds = 0;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('current-time').innerHTML = secondsToTime(currentSongDurationSeconds);
  updateProgressBar();
}

function updateProgressBar() {
  const progressBar = document.querySelector('.progress');
  if (totalSongDurationSeconds > 0) {
    const percentage = (currentSongDurationSeconds / totalSongDurationSeconds) * 100;
    progressBar.style.width = percentage + '%'; // Update progress bar width
  }
}

// Helper function to convert seconds to formatted time string
function secondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
