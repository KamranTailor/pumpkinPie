// functions/database/addEntry.js

import dotenv from 'dotenv';
dotenv.config();
export default async function addEntry(databaseId, newEntry) {
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
