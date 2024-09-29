import dotenv from 'dotenv';
dotenv.config();

export default async function setActivity(userId, service) {
    const databaseId = "b59b7631-f435-4189-b2ab-0c26a27def85";
    const originalResponse = await fetch(`${process.env.MIDAS_URL}/getDatabase?api_key=${process.env.MIDAS_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId })
    });

    const originalData = await originalResponse.json();
    
    for (let i in originalData.data) {
        if (originalData.data[i].id === userId) { 

            let user = originalData.data[i]; // Get the entire user object
            let history = user.history;

            if (history && history.length > 0) {
                const baseTimestamp = new Date().getTime();

                // Check if the service already exists in the history
                let existingEntry = history.find(entry => entry.service === service);

                if (existingEntry) {
                    // If the service exists, update its timestamp
                    existingEntry.timestamp = baseTimestamp;
                } else {
                    // If not, find the oldest entry and update it
                    let oldestEntry = history.reduce((oldest, entry) => {
                        return new Date(entry.timestamp) < new Date(oldest.timestamp) ? entry : oldest;
                    });

                    // Replace the service of the oldest entry with the new service and timestamp
                    oldestEntry.service = service;
                    oldestEntry.timestamp = baseTimestamp;
                }

                // Now send the updated user object back to the server to persist the change
                const updateResponse = await fetch(`${process.env.MIDAS_URL}/editEntry?api_key=${process.env.MIDAS_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ databaseId: databaseId, entryId: userId, newArray: user })
                });

                const updateResult = await updateResponse.json();
                return true; // Return the result of the update operation
            }
        }
    }
}
