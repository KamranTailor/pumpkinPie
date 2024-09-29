function msToTime(ms) {
  let minutes = Math.floor(ms / 60000); // 1 minute = 60000 milliseconds
  let seconds = ((ms % 60000) / 1000).toFixed(0); // get remaining seconds
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds; // pad with zero if seconds < 10
}

function secondsToTime(seconds) {
  let minutes = Math.floor(seconds / 60); // 1 minute = 60 seconds
  let remainingSeconds = seconds % 60; // get remaining seconds
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds; // pad with zero if seconds < 10
}


const backgrounds = [
  { name: "dj.jpg" },
  { name: "guitar.jpg" },
  { name: "mic.jpg" },
  { name: "studio.jpg" }
];

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const path = `url(/src/music-backgrounds/${backgrounds[randomIndex].name})`;
  document.getElementById("main").style.backgroundImage = path;  // Use backgroundImage
  console.log(backgrounds[randomIndex].name)
}

setRandomBackground();