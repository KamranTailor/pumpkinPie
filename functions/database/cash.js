// functions/database/cash.js

import dotenv from 'dotenv';
dotenv.config();
export default async function cash(databaseId, newData) {
    const response = await fetch(`${process.env.MIDAS_URL}/dataCaching/setData?api_key=${process.env.MIDAS_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId: databaseId, newData: newData })
    });
    const data = await response.json();
    return await data;
}
