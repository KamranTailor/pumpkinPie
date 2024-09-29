// functions/database/getDatabase.js

import dotenv from 'dotenv';
dotenv.config();

export default async function getDatabase(databaseId) {
    const response = await fetch(`${process.env.MIDAS_URL}/getDatabase?api_key=${process.env.MIDAS_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId })
    });
    const data = await response.json();
    return data;
}

