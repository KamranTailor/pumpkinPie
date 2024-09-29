// functions/database/deleteEntry.js

import dotenv from 'dotenv';
dotenv.config();
export default async function deleteEntry(databaseId, entryId) {
    const response = await fetch(`${process.env.MIDAS_URL}/deleteEntry?api_key=${process.env.MIDAS_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId, entryId: entryId })
    });
    const data = await response.json();
    return await data;
}
