import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as socketIo } from 'socket.io';
import { writeFile } from 'fs/promises';
import axios from 'axios';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development'; // Check the environment

const port = isDev ? 8080 : process.env.PORT || 8080; // Use different ports for dev and prod
import app from './routes/main.js'; // Your API routes are here
import kamran from './functions/main.js';

import { initializePeriodicTasks } from './dump/main.js'; 

if (isDev == false) {
    initializePeriodicTasks();
}

import initializeSocket from './sockets/spotifySockets.js'; 
const server = createServer(app);
const io = new socketIo(server);
initializeSocket(io);
import initializeFlightSocket from './sockets/flights.js';
initializeFlightSocket(io); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/version', (req, res) => {
    res.json({ version: "V1", environment: isDev ? 'development' : 'production' });
});

server.listen(port, () => {
    console.log(`Listening on port ${port} in ${isDev ? 'development' : 'production'} mode`);
});
