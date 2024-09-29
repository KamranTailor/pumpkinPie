import express from 'express';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://kamrantailor.com/callback/spotify"; // Must match Spotify dashboard

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// 1. Route for Spotify Authentication
router.get('/', (req, res) => {
    const scope = [
        'user-read-private',
        'user-read-email',
        'playlist-read-private',
        'user-top-read',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-recently-played',
        'user-read-currently-playing',
        'streaming'
    ].join(' ');

    const params = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: scope,
        show_dialog: true
    });

    const authUrl = `${AUTH_URL}?${params}`;
    res.redirect(authUrl); // Corrected from request.redirect to res.redirect
});

export default router
