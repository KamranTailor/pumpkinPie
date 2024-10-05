function onStart() {
    let linkedAccounts = `<div class="social-btn-container">`;
    let accounts = ["spotify", "google", "discord"];
    if (userData.linkedAccounts[0].spotify) {
        linkedAccounts += `
            <button type="button" class="social-btn spotify-btn" onclick="unlinkSpotify()" width="200px" height="200px">
                <img src="/src/icons/spotify-icon.png" alt="Spotify" class="social-icon">
                 Unlink Spotify
            </button>
        `;
        // Remove "spotify" from accounts array
        accounts = accounts.filter(account => account !== "spotify");
    }

    for (let i in accounts) {
        linkedAccounts += `
            <button type="button" class="social-btn ${accounts[i]}-btn" onclick="link${accounts[i]}()" width="200px" height="200px">
                <img src="/src/icons/${accounts[i]}-icon.png" class="social-icon">
                 Link ${accounts[i].charAt(0).toUpperCase() + accounts[i].slice(1)}
            </button>
        `;
    }
    linkedAccounts += `</div>`;
    console.log(accounts);

    const content = `<h1>Settings for ${userData.firstName}</h1>
            <br>
            <div class="label-view">First Name</div>
            <div class="label-value">${userData.firstName}</div>
            <div class="label-view">Last Name</div>
            <div class="label-value">${userData.lastName}</div>
            <div class="label-view">Email</div>
            <div class="label-value">${userData.email}</div>
            <div class="label-view">Internal Email</div>
            <div class="label-value">${userData.internalEmail}</div>
            <div class="label-view">Handle</div>
            <div class="label-value">${userData.handle}</div>
            <div class="label-view">Access Level</div>
            <div class="label-value">${userData.accessLevel}</div>
            <div class="label-view">User ID</div>
            <div class="label-value">${userData.id}</div>
            `
    document.getElementById("content").innerHTML= content;
    document.getElementById("linkedAccounts").innerHTML= linkedAccounts;
}

async function unlinkSpotify() {
    openPopUp("To do that please contact an admin.");
}
