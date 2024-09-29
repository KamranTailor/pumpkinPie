let currentTimeMs = 0;
let intervalId = null;
let songDurationMs = 0; 
let run = false; // Progress bar is paused by default

// Function to manually set the progress bar length for a new song
function setProgressBarLength(durationMs, newCurrentTimeMs) {
    currentTimeMs = newCurrentTimeMs; // Update the current time to the manually set value
    songDurationMs = durationMs; // Update the total duration of the song
    updateProgressBar(durationMs); // Update the progress bar based on the new time
    updateTimeElements(durationMs); // Update time-related elements
}

// Helper function to update the progress bar UI
function updateProgressBar(durationMs) {
    const progressBar = document.getElementById('progress-bar');
    const percentage = (currentTimeMs / durationMs) * 100;
    progressBar.style.width = `${percentage}%`;
}

// Function to pause the progress bar
function pauseBar() {
    run = false; // This will stop the progress bar from updating
}

// Function to resume the progress bar
function resumeBar() {
    run = true; // This will allow the progress bar to continue updating
}

// Update the time-related HTML elements
function updateTimeElements(durationMs) {
    const totalLengthElem = document.getElementById('total-length');
    const timePlayedElem = document.getElementById('time-played');
    
    const totalMinutes = Math.floor(durationMs / 60000); // Convert to minutes
    const totalSeconds = Math.floor((durationMs % 60000) / 1000); // Remaining seconds
    
    const timePlayedMinutes = Math.floor(currentTimeMs / 60000);
    const timePlayedSeconds = Math.floor((currentTimeMs % 60000) / 1000);
    
    totalLengthElem.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`; // Format total length
    timePlayedElem.textContent = `${timePlayedMinutes}:${timePlayedSeconds < 10 ? '0' : ''}${timePlayedSeconds}`; // Format time played
}

// Continuous interval that updates every second, starts immediately
if (!intervalId) {
    intervalId = setInterval(() => {
        if (run) {
            if (currentTimeMs >= songDurationMs) {
                currentTimeMs = 0; // Reset progress when song ends (or stop the interval)
            } else {
                currentTimeMs += 1000; // Add one second (1000 milliseconds)
                updateProgressBar(songDurationMs); // Update the progress bar each second
                updateTimeElements(songDurationMs); // Update time elements each second
            }
        }
    }, 1000); // Update every second (1000ms)
}
