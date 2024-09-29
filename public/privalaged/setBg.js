const backgrounds = [
    { name: "chicargo.jpg" },
    { name: "city-street.jpg" },
    { name: "forest.jpg" },
    { name: "mountains.jpg" },
    { name: "singapore.jpg" },
    { name: "vancouver.jpg" }
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const path = `url(/src/backgrounds/${backgrounds[randomIndex].name})`;
    document.getElementById("main").style.backgroundImage = path;  // Use backgroundImage
    console.log(backgrounds[randomIndex].name)
}

setRandomBackground();