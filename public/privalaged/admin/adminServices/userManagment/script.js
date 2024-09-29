async function startProgramPage() {
    // Load program page code here
    console.log('Program page started');
    const response = await fetch('/admin/adminGetUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            email: localStorage.getItem('email'),
            session: localStorage.getItem('session')
        }
    });
    const data = await response.json();
    console.log(data);


    for (let i in data.user) {

        const date = new Date(data.user[i].lastLogin);   
        const day = date.toLocaleDateString(); 
        const time = date.toLocaleTimeString();

        let linkedAccounts = ""; 
        for (let j in data.user[i].linkedAccounts) {
            console.log(data.user[i].linkedAccounts[j].spotify); 

            if (typeof data.user[i].linkedAccounts[j].spotify !== 'undefined' && data.user[i].linkedAccounts[j].spotify) {
                linkedAccounts += "<div id='spotify'>Spotify</div>"; 
            }
        }
        document.getElementById("tableBody").innerHTML += `<tr>
        <td>${data.user[i].firstName}</td>
        <td>${data.user[i].lastName}</td>
        <td>${data.user[i].email}</td>
        <td>@${data.user[i].handle}</td>
        <td>${data.user[i].accessLevel}</td>
        <td>${day} ${time}</td>
        <td>${linkedAccounts}</td>
        <td>
            <button onclick="goTo('./editUser?${data.user[i].id}')">Edit</button>
            <button onclick="delte('${data.user[i].id}')">Delete</button>
        </td>
      </tr>`
    }
}
