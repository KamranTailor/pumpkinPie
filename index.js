// index.js

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createServer } from 'http'; // ESM-compatible import for http
import { Server as socketIo } from 'socket.io'; // ESM import for socket.io
import { writeFile } from 'fs/promises';

dotenv.config();

const port = 8080;
import app from './routes/main.js'; // Your API routes are here
import kamran from './functions/main.js';

import { initializePeriodicTasks } from './dump/main.js'; 
initializePeriodicTasks();

import initializeSocket from './sockets/spotifySockets.js'; 
const server = createServer(app);
const io = new socketIo(server);
initializeSocket(io);
import initializeFlightSocket from './sockets/flights.js';
initializeFlightSocket(io); 

async function getData() {
    const url = "https://api.tfl.gov.uk/StopPoint/Mode/elizabeth-line?app_id=c9b7f5e2042243fcb268a8f523a96a0e";
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        let newData = [];
        for (let stopPoint of data.stopPoints) {
            newData.push({
                naptanId: stopPoint.naptanId,
                commonName: stopPoint.commonName,
                id: stopPoint.id,
                lines: stopPoint.modes // Assuming modes is an array of strings
            });
        }

        // Save the data to a JSON file using async/await
        await writeFile('dataset/tfl-lines/elizabeth-line.json', JSON.stringify(newData, null, 2), 'utf8');
        console.log('Data saved to dlr.json');
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    }
}

getData();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/version', (req, res) => {
    res.json({ version: "V1" });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
