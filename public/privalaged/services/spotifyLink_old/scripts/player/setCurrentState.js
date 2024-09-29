function setState(state) {
    document.getElementById("device").innerHTML= `🎶 Playing on ${state.device.name}`



    const display = "inline-block";
    if (state.shuffle_state) {
        if (state.smart_shuffle) {
            document.getElementById("shuffle-off").style.display = "none";
            document.getElementById("shuffle-on").style.display = "none";
            document.getElementById("shuffle-smart").style.display = display;
        } else {
            document.getElementById("shuffle-off").style.display = "none";
            document.getElementById("shuffle-on").style.display = display;
            document.getElementById("shuffle-smart").style.display = "none";
        }
    } else {
        document.getElementById("shuffle-off").style.display = display;
        document.getElementById("shuffle-on").style.display = "none";
        document.getElementById("shuffle-smart").style.display = "none";
    }
}

