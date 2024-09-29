let userData;
let dataLoaded = false;

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
            <a href="/privalaged/landing">Home</a>
            <a href="/privalaged/dashboard">Dashboard</a>
            <a href="/privalaged/docs">Docs</a>
            <a href="/privalaged/messages">Messages</a>
            <a href="/privalaged/account" class="account"><img class="image-b" width="30px" height="30px" src="/src/account.png" /></a>
        </nav>
    </header>`
    var header = document.createElement("div");
    header.innerHTML = data;
    var body = document.body;

    // Insert the new element at the beginning of the body
    body.insertBefore(header, body.firstChild);
}

async function insertFooter() {
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
                    <a href="/info/sitemap">Sitemap</a>
                </span>
                <span class="sitemap">
                    <a href="/info/sources">Sources</a>
                </span>
                <span class="sitemap">
                    <a href="/info/termsOfUse">Terms Of Use</a>
                </span>
                <span class="sitemap">
                    <a href="/info/version">Current Version</a>
                </span>
            </div>
        </div>
    </div>
    <hr>
    <div class="disclaimer">
        <p>Made By Tailored Technology Inc, Maintained by Kamran Industries London</p>
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

function goTo(path) {
    window.location = path;
}

async function onStartMain() {
    if (localStorage.getItem('email') && localStorage.getItem('session')) {
        let response;
        // Check if the variable 'service' exists and is not null or undefined
        if (typeof service !== 'undefined' && service) {
            response = await fetch('/getUserService', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('email'),
                    clientKey: localStorage.getItem('session'),
                    service: service
                })
            });
        } else {
            response = await fetch('/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('email'),
                    clientKey: localStorage.getItem('session')
                })
            });
        }
        const data = await response.json();
        userData = data.user;
        dataLoaded = true;

        if (typeof waitingForStart !== 'undefined' && waitingForStart && waitingForStart == true) {
            onStart()
        }

        console.log(data);
        if (data.status === false) {
            window.location = '/login';
        }
    } else {
        window.location = '/login';
    }
}

onStartMain()
insertHeader()
