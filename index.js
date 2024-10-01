// index.js

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createServer } from 'http'; // ESM-compatible import for http
import { Server as socketIo } from 'socket.io'; // ESM import for socket.io

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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/version', (req, res) => {
    res.json({ version: "V1" });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
