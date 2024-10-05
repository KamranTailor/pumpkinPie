function downloadData() {
    // Convert the userData object to a JSON string
    const dataStr = JSON.stringify(userData, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([dataStr], { type: 'application/json' });

    // Create a link element
    const link = document.createElement('a');

    // Create a URL for the Blob and set it as the href of the link
    const url = URL.createObjectURL(blob);
    link.href = url;

    // Set the download attribute with a file name
    link.download = 'userData.json';

    // Append the link to the document body and trigger a click to download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link element and revoking the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function linkspotify() {
    window.location = "/spotify/login";
}

function linkdiscord() {
    alert("Sorry, feature not available!")
}

function linkgoogle() {
    alert("Sorry, feature not available!")
}

async function logout() { 
    const responce = await fetch("/user/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            email: localStorage.getItem('email'),
            session: localStorage.getItem('session')
        },
        body: JSON.stringify({
            id: userData.id,
        })
    })
    const data = await responce.json();
    localStorage.setItem('session', false);
    localStorage.setItem('email', false);
    window.location = '/';
}

function deleteAccount() {
    openPopUp("To delete your account please contact an admin via our contact form");
}