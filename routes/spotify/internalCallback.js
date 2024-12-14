import express from 'express';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import kamran from '../../functions/main.js'
const router = express.Router();
import fetch from 'node-fetch';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URL; 


const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

router.post('/', async (request, res) => {
    const { code, email } = request.body;  

    if (!code) {
        return res.status(400).json({ error: 'Authorization code not found' });
    }

    try {
        const tokenResponse = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
            },
            body: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            })
        });

        const tokenData = await tokenResponse.json();

        if (tokenResponse.ok) {
            const { access_token, refresh_token, expires_in } = tokenData;

            const users = await kamran.database.getDatabase("b59b7631-f435-4189-b2ab-0c26a27def85");
            for (let user in users.data) {
                if (users.data[user].email == email) {
                    // Ensure linkedAccounts exists and is an array
                    if (!Array.isArray(users.data[user].linkedAccounts)) {
                        users.data[user].linkedAccounts = []; // Initialize linkedAccounts as an array if not present
                    }

                    // Always store the Spotify account at index 0
                    users.data[user].linkedAccounts["spotify"] = {
                        spotify: {
                            accessToken: access_token,
                            refreshToken: refresh_token,
                            accessTokenExpiration: Date.now() + (expires_in * 1000)
                        }
                    };

                    // Update the database entry
                    const add = await kamran.database.editEntry("b59b7631-f435-4189-b2ab-0c26a27def85", users.data[user].id, users.data[user]);

                    if (add.status == true) {
                        return res.json({ status: true, message: 'Logged in successfully' });
                    } else {
                        return res.status(500).json({ error: 'Failed to update user' });
                    }
                }
            }
        } else {
            console.error('Error fetching access token:', tokenData);
            res.status(500).json({ error: 'Failed to retrieve access token' });
        }

    } catch (error) {
        console.error('Error during token exchange:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
