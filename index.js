let version = "V11.55";
let versionDate = new Date();;

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as socketIo } from 'socket.io';
import { writeFile } from 'fs/promises';
import axios from 'axios';
import { Client, GatewayIntentBits } from 'discord.js';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development'; // Check the environment

const port = isDev ? 8080 : process.env.PORT || 8080; // Use different ports for dev and prod
const rainbowLogicPort = 1000;
const privateWebPort = 2000;

import app from './routes/main.js'; // Your API routes are here
import kamran from './functions/main.js';
import { initilaizeDiscordBot } from './discord/main.js'
import { initializePeriodicTasks } from './dump/main.js'; 


if (isDev == false) {
    initilaizeDiscordBot(process.env.DISCORDBOT);
    initializePeriodicTasks();
} else {
    initilaizeDiscordBot(process.env.DISCORDBOTDEV);
}

import initializeSocket from './sockets/spotifySockets.js'; 
const server = createServer(app);
const io = new socketIo(server);
initializeSocket(io);
import initializeFlightSocket from './sockets/flights.js';
initializeFlightSocket(io); 

import rainbowLogicApp from "./rainbowLogic/main.js"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

rainbowLogicApp.use(bodyParser.urlencoded({ extended: true }));
rainbowLogicApp.use(express.static('rainbowLogic/public'));


app.get('/version', (req, res) => {
    res.json({ version: version, environment: isDev ? 'development' : 'production', date: versionDate });
});

rainbowLogicApp.get('/version', (req, res) => {
    res.json({ version: version, environment: isDev ? 'development' : 'production', date: versionDate});
});

rainbowLogicApp.listen(rainbowLogicPort, () => {
    console.log(`Listening on port ${rainbowLogicPort} in ${isDev ? 'development' : 'production'} mode`);
});

server.listen(port, () => {
    console.log(`Listening on port ${port} in ${isDev ? 'development' : 'production'} mode`);
});
