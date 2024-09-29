// functions/sessions/createSession.js

import dotenv from 'dotenv';
dotenv.config();

export default async function createSession(clientKey, ip, created, userId) {
    const databaseId = "007383ba-72af-42a1-b8ff-ac2f3f5a03ac";
    async function checkCurrentSessions() {
        const orgiginalResponce = await fetch(`${process.env.MIDAS_URL}/getDatabase?api_key=${process.env.MIDAS_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ databaseId: databaseId })
        });
        const orriginalData = await orgiginalResponce.json();
        for (let i in orriginalData.data) {
            if (orriginalData.data[i].userId === userId) {
                const entryId = orriginalData.data[i].id;
                const responseDel = await fetch(`${process.env.MIDAS_URL}/deleteEntry?api_key=${process.env.MIDAS_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ databaseId: databaseId, entryId: entryId })
                });
                const dataDel = await responseDel.json();
            }
        }
    }


    const newEntry = {
        "ip": ip,
        "created": created,
        "userId": userId,
        "clientKey": clientKey
    };
    checkCurrentSessions()

    const response = await fetch(`${process.env.MIDAS_URL}/addEntry?api_key=${process.env.MIDAS_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId, newArray: newEntry })
    });
    const data = await response.json();
    return await data;
}
