// functions/database/editEntry.js

import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
export default async function editEntry(databaseId, entryId, newArray) {
    const response = await fetch(`${process.env.MIDAS_URL}/editEntry?api_key=${process.env.MIDAS_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId, entryId: entryId, newArray: newArray })
    });
    const data = await response.json();
    return await data;
}
