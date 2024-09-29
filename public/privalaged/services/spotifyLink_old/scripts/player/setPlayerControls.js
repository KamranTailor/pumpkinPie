function setPlayerControls(item) {
    const display = "inline-block";

    if (item.paused == false) {
        document.getElementById("play").style.display = "none";
        document.getElementById("pause").style.display = display;
    } else {
        document.getElementById("play").style.display = display;
        document.getElementById("pause").style.display = "none";
    }

    if (item.repeat_mode == 0) {
        document.getElementById("repeat-off").style.display = display;
        document.getElementById("repeat-track").style.display = "none";
    } else {
        document.getElementById("repeat-off").style.display = "none";
        document.getElementById("repeat-track").style.display = display;
    }
}