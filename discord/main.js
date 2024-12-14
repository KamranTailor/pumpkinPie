// discord/main.js

import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import querystring from 'querystring';

dotenv.config();


// Initialize and start periodic tasks
export function initilaizeDiscordBot() {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });
    
    const token = process.env.DISCORDBOT;
    
    // Event: When the bot is ready
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    
    // Event: Respond to messages
    client.on('messageCreate', (message) => {
        if (message.content.toLowerCase() === '$ping') {
            message.channel.send('Pong!');
        } else if (message.content.toLowerCase() === '$hello') {
            message.channel.send(`Hello, ${message.author.username}!`);
        }

        
    });
    
    // Log in to Discord
    client.login(token);
}
