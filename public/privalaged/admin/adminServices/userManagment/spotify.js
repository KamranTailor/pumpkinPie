async function spotifyData(idUser) {
    console.log(idUser);
    let user;
    console.log(data.user);
    for (let i in data.user) {

        if (data.user[i].id === idUser) {
            user = data.user[i];
            break
        }
    }

    const content = `
        <p>Access Token ${user.linkedAccounts[0].spotify.accessToken}</p>
        <p>Access Token Expiration ${user.linkedAccounts[0].spotify.accessTokenExpiration}</p>
        <p>Refresh Token ${user.linkedAccounts[0].spotify.refreshToken}</p>
        <button onclick="unlinkAccount('${idUser}')">Unlink</button>`
    openPopUp(content)
}

async function unlinkAccount(id) {
    console.log(id);
    const response = await fetch('/admin/spotify/unlinkAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            email: localStorage.getItem('email'),
            session: localStorage.getItem('session')
        },
        body: JSON.stringify({
            id: id
        })
    });
    const data = await response.json();
    console.log(data);
    if (data.status) {
        closePopUp()
        alert("Account Unlinked Successfully")
        window.location.reload()
    } else {
        alert("Failed to Unlink Account")
    }
}

async function deleteAccount(id) {
    const response = await fetch('/admin/user/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            email: localStorage.getItem('email'),
            session: localStorage.getItem('session')
        },
        body: JSON.stringify({
            id: id
        })
    });
    const data = await response.json();
    console.log(data);
    if (data.status) {
        alert("Deleted Account Successfully")
        window.location.reload()
    } else {
        alert("Failed to Unlink Account")
    }

}