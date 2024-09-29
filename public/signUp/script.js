function signInService() {
    alert('Sorry, you cant yet do that!')
}

async function createAccount() {
    console.log('Creating account')
    const response = await fetch('/sighnUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value
        })
    });
    const data = await response.json();
    console.log(data);
    if (data.status === true) {
        document.getElementById('login-form').innerHTML = `<h1>Hello ${data.user.firstName}!</h1> 
         <p>We have successfulluy created your account please login.</p> 
         <br>
         <button onClick="login()" class="login-button">Login</button>
         `;
        //window.location = '/login';
    } else {
        document.getElementById('error-message').innerHTML = data.message;
    }
}

function login() {
    window.location= "/login";
}