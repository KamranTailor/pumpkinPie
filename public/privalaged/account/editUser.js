
function editUser() {
    const content = `
                <label for="firstName" class="d-label">First Name:</label>
                <input type="text" id="firstName" class="d-input" value="${userData.firstName}">

                <label for="lastName" class="d-label">Last Name:</label>
                <input type="text" id="lastName" class="d-input" value="${userData.lastName}">

                <label for="email" class="d-label">Email:</label>
                <input type="text" id="email" class="d-input" value="${userData.email}">

                <label for="handle" class="d-label">Handle:</label>
                <input type="text" id="handle" class="d-input" value="${userData.handle}">

                <button class="blue-button" onclick="updateUser()">Update</button>
            `;
    openPopUp(content);
}

async function updateUser() {
    let newData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        handle: document.getElementById('handle').value,
        oldHandle: userData.handle 
    }

    const response = await fetch('/user/editUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            email: localStorage.getItem('email'),
            session: localStorage.getItem('session')
        },
        body: JSON.stringify({
            id: userData.id,
            newData: newData
        })
    });
    const data = await response.json();
    console.log(data);
    if (data.status) {
        alert('User updated successfully!');
        window.location.reload();
    } else {
        alert(data.message);
    }
}

function changePassword() {
    const content = `
                <label for="currentPassword" class="d-label">Current Password:</label>
                <input type="password" id="currentPassword" class="d-input">

                <label for="newPassword" class="d-label">New Password:</label>
                <input type="password" id="newPassword" class="d-input">

                <label for="confirmPassword" class="d-label">Confirm New Password:</label>
                <input type="password" id="confirmPassword" class="d-input">

                <button class="blue-button" onclick="changePasswordSubmit()">Change Password</button>
            `;
    openPopUp(content);
}

async function changePasswordSubmit() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword!== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }

    const response = await fetch('/user/changePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            email: localStorage.getItem('email'),
            session: localStorage.getItem('session')
        },
        body: JSON.stringify({
            oldPassword: currentPassword,
            newPassword: newPassword,
            id: userData.id
        })
    });
    const data = await response.json();
    console.log(data);
    
    if (data.status) {
        alert('Password changed successfully!');
        closePopUp();
    } else {
        alert(data.message);
    }
}