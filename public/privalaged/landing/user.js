
async function getUsers() {
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
        
        if (data.status === false) {
            window.location = '/login';
        }
        console.log(data);
    
        const greeting = getGreetingByTime();
    
        document.getElementById('greeting').innerHTML = ` ${greeting.emoji} ${greeting.text}`
        document.getElementById('name').innerHTML = data.user.firstName;

        document.getElementById('boxesLastUsed').innerHTML = `
            <div class="box" onclick="goTo('/privalaged/services/${data.user.history[0].service}')">${formatService(data.user.history[0].service)}</div>
            <div class="box" onclick="goTo('/privalaged/services/${data.user.history[1].service}')">${formatService(data.user.history[1].service)}</div>
            <div class="box" onclick="goTo('/privalaged/services/${data.user.history[2].service}')">${formatService(data.user.history[2].service)}</div>
            <div class="box" onclick="goTo('/privalaged/services/${data.user.history[3].service}')">${formatService(data.user.history[3].service)}</div>
        `;
        
    } else {
        window.location = '/login';
    }
}

function serviceReaderbel(service) {
    switch (service) {
        case 'tubeTime':
            return 'Tube Time';
        case 'gaming':
            return 'Service B Description';
        case 'Service C':
            return 'Service C Description';
        case 'Service D':
            return 'Service D Description';
        default:
            return 'Unknown Service';
    }
}

function formatService(service) {
    return service
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Add a space before uppercase letters
      .replace(/^\w/, c => c.toUpperCase()); // Capitalize the first letter
}
  
function getGreetingByTime() {
    const currentHour = new Date().getHours();

    let greeting;

    const randomNumber = Math.random() * (5 - 0) + 0;

    if (randomNumber > 3) {
        if (currentHour >= 5 && currentHour < 12) {
            // Morning (5 AM to 12 PM)
            greeting = { text: "Good morning,", emoji: "🌅" };
        } else if (currentHour >= 12 && currentHour < 18) {
            // Afternoon (12 PM to 6 PM)
            greeting = { text: "Good afternoon,", emoji: "☀️" };
        } else {
            // Evening (6 PM to 5 AM)
            greeting = { text: "Good evening,", emoji: "🌇" };
        }
    } else {
        const greetings = [
            { text: "Hello,", emoji: "👋" },
            { text: "Hi,", emoji: "🙋" },
            { text: "Hey,", emoji: "😊" },
            { text: "Howdy,", emoji: "🤠" },
            { text: "What's up,", emoji: "🤔" },
            { text: "Greetings,", emoji: "🌟" },
            { text: "Welcome,", emoji: "👋" },
            { text: "Hi there,", emoji: "👋" },
            { text: "Good to see you,", emoji: "😄" },
            { text: "Hey there,", emoji: "🙌" },
            { text: "How's it going,", emoji: "👍" },
            { text: "Nice to meet you,", emoji: "😊" }
        ];

        // Generate a random index
        const randomIndex = Math.floor(Math.random() * greetings.length);

        // Return a greeting and its associated emoji
        greeting = greetings[randomIndex];
    }

    return greeting;
}


getUsers();