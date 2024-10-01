function editUser(id) {
    for (let i in data.user) {
        if (data.user[i].id === id) {
            const content = `
                <label for="firstName" class="d-label">First Name:</label>
                <input type="text" id="firstName" class="d-input" value="${data.user[i].firstName}">

                <label for="lastName" class="d-label">Last Name:</label>
                <input type="text" id="lastName" class="d-input" value="${data.user[i].lastName}">

                <label for="email" class="d-label">Email:</label>
                <input type="text" id="email" class="d-input" value="${data.user[i].email}">

                <label for="handle" class="d-label">Handle:</label>
                <input type="text" id="handle" class="d-input" value="${data.user[i].handle}">

                <label for="accessLevel" class="d-label">Access Level:</label>
                <input type="text" id="accessLevel" class="d-input" value="${data.user[i].accessLevel}">

                <label for="internalEmail" class="d-label">Internal Email:</label>
                <input type="text" id="internalEmail" class="d-input" value="${data.user[i].internalEmail}">

                <button class="blue-button" onclick="updateUser('${id}')">Update</button>
            `;
            openPopUp(content);
            break;
        }
    }
}

async function updateUser(id) {
    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        handle: document.getElementById('handle').value,
        accessLevel: document.getElementById('accessLevel').value,
        internalEmail: document.getElementById('internalEmail').value
    };

    try {
        const response = await fetch(`/admin/user/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                email: localStorage.getItem('email'),
                session: localStorage.getItem('session')
            },
            body: JSON.stringify({
                id: id,
                userData: userData
            })
        });
        const data = await response.json();

        if (data.status) {
            alert('User updated successfully!');
            window.location.reload();
        } else {
            alert('Failed to update user.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the user.');
    }
}
