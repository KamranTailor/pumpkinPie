document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

async function insertHeader() {
    const data = `<header>
        <a href="/" class="logo">Kamran Tailor</a>
        <button class="menu-toggle" aria-label="Toggle navigation">
            &#9776; 
        </button>
        <nav class="menu">
            <a href="/">Home</a>
            <a href="/#about-me">About Me</a>
            <a href="/#news">News</a>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
            <a href="/login" class="login-button">Login</a>
        </nav>
    </header>
     <div id="popup" class="popup">
                <div class="popup-content">
                    <span id="closePopup" class="close-button" onclick="closePopUp()">&times;</span>
                    <div id="pop-text">
                    dd
                    </div>
                </div>
            </div>`
    var header = document.createElement("div");
    header.innerHTML = data;
    var body = document.body;

    // Insert the new element at the beginning of the body
    body.insertBefore(header, body.firstChild);
}

async function insertFooter() {
    const res = await fetch('/version');
    const dataServer = await res.json();
    console.log(dataServer);

    const date = new Date(dataServer.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-GB");

    const data = `<footer>
    <div class="footer-container">
        <div class="left-section">
            <div class="logo">
                🌐 Kamran Tailor
            </div>
            <div class="sitemap-container">
                <span class="sitemap">
                    <a href="/info/privacyPolicy">Privacy Policy</a>
                </span>
                <span class="sitemap">
                    <a href="/info/sources">Sources</a>
                </span>
                <span class="sitemap">
                    <a href="/info/termsOfUse">Terms Of Use</a>
                </span>
                <span class="sitemap">
                    <a href="https://github.com/KamranTailor/pumpkinPie">Open Source</a>
                </span>
            </div>
        </div>
    </div>
    <hr>
    <div class="disclaimer">
        <p>Made By Tailored Technology Inc, Maintained by Kamran Industries London</p>
            [Conected to ${dataServer.version} - ${dataServer.environment} server ${formattedDate} ${formattedTime}] 

    </div>
    <div class="copyright-terms">
        <p>&copy; 2024 Kamran Tailor</p>
    </div>
</footer>
`

    var footer = document.createElement("div");
    footer.innerHTML = data;
    var body = document.body;

    // Insert the new element at the beginning of the body
    body.appendChild(footer);
}

function openPopUp(content) {
    document.getElementById("popup").style.display = "block";
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

insertHeader()
insertFooter()
