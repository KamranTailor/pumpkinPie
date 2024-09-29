function signInService() {
    alert('Sorry, you cant yet do that!')
}

async function login() {
    console.log('Creating account')
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    });
    const data = await response.json();
    console.log(data);

    if (data.status === true) {
        localStorage.setItem('session', data.session);
        localStorage.setItem('email', data.user.email);
        window.location = '/privalaged/landing';
    } else {
        document.getElementById('error-message').innerHTML = data.message;
    }
}

async function checkUser() {
    if (localStorage.getItem('email') && localStorage.getItem('session')) {
        const response = await fetch('/getUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('email'),
                clientKey: localStorage.getItem('session')
            })
        });
        const data = await response.json();
        
        if (data.status === true) {
            window.location = '/privalaged/landing';
        }
    }
}

checkUser()
