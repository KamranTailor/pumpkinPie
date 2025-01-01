// discord/main.js

import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import querystring from 'querystring';

dotenv.config();
import { getStatus } from './tflRoutes.js';

// Initialize and start periodic tasks
export function initilaizeDiscordBot(tokenFromUser) {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });
    
    const token = tokenFromUser;
    
    // Event: When the bot is ready
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    
    // Event: Respond to messages
    client.on('messageCreate', (message) => {
        if (message.content.toLowerCase() === '$ping') {
            message.channel.send('Pong!');
        } else if (message.content.toLowerCase() === '$hello') {
            message.channel.send(`Hello, ${message.author.username}!!!!`);

        } else if (message.content.toLowerCase() === '$tfl') {
            console.log('Received $tfl command');
            getStatus()
                .then((res) => {
                    message.channel.send(res);
                })
                .catch((error) => {
                    message.channel.send('There was an error fetching the TFL status. Please try again later.');
                });
        }
        
    });
    
    // Log in to Discord
    client.login(token);
}
