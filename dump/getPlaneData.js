import kamran from "../functions/main.js";

import dotenv from 'dotenv';
dotenv.config();

const databaseId = "2f248411-4a71-4a1a-829b-d64d5dfa4e3b";

async function setData() {
    try {
        const response = await fetch("http://192.168.0.238/dump1090/data/aircraft.json");
        const data = await response.json();
        const newData = [data]
        const cash = await kamran.database.cash(databaseId, newData);

        const timestampISO = new Date().toISOString();
        const readableTimestamp = new Date(timestampISO).toLocaleString();

        let msg = '';
        if (cash.status == true) {
            msg = (`Data Saved to, ${databaseId}, *${readableTimestamp}*`);
        } else {
            msg = (`Error saving data to, ${databaseId}, *${readableTimestamp}*`);
            console.error('Error running periodic task:', cash);

        }

    } catch (error) {
        console.error('Error running periodic task:', error);
    }
}

export function setPlaneData() {
    setData(); // Run the task initially
    setInterval(setData, 1000); // 1 minute 30 seconds in milliseconds
}
