function openPopUp(title, img, content) {
    if (img == false ) {
        document.getElementById("pop-img").style.display = "none";
    } else {
        document.getElementById("pop-img").style.display = "block";
        document.getElementById("pop-img").src = img;
    }
    document.getElementById("popup").style.display = "block";
    document.getElementById("pop-title").innerHTML = title;
    document.getElementById("pop-text").innerHTML = content; // This should fill in the content
};

function closePopUp() {
    document.getElementById("popup").style.display = "none";
};

// Close the popup if the user clicks anywhere outside of it
window.onclick = function (event) {
    const popup = document.getElementById("popup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
};
