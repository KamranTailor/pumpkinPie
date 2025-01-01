document.addEventListener('DOMContentLoaded', function () {
    insertHeader()

    if (typeof showFooter !== 'undefined') {
        if (!showFooter) { insertFooter() }
    } else {
        insertFooter()
    }

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});

async function insertHeader() {
    const data = `<header>
    <nav class="navbar">
        <div class="container">
            <a href="/" class="logo">🌈 Rainbow Logic</a>
            <button class="hamburger" id="hamburger">
                <i class="fas fa-bars"></i> <!-- Replaces the bars with a Font Awesome icon -->
            </button>
            <ul class="nav-links" id="nav-links">
                <li><a href="/#about">About</a></li>
                <li><a href="/#projects">Projects</a></li>
                <li><a href="/#contact">Contact</a></li>
                <li><a href="/projects"><button class="headerButton">View All Projects</button></a></li>
            </ul>

        </div>
    </nav>
</header>
`
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

    const data = `    <footer>
        <div class="container">
            <p>© 2024 <a href="https://kamrantailor.com" class="highlight" >Kamran Tailor</a>. Made with ❤️ for creativity.</p>
            [Conected to ${dataServer.version} - ${dataServer.environment} server ${formattedDate} ${formattedTime}] 
        </div>
    </footer>
`

    var footer = document.createElement("div");
    footer.innerHTML = data;
    var body = document.body;

    // Insert the new element at the beginning of the body
    body.appendChild(footer);
}


function goTo(place) {
    window.location = place;
}