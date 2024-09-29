import express from 'express';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const CLIENT_ID = 'b75d3435992c4f9dbac38d59e2db62ef';
const CLIENT_SECRET = '6c61f99a801147d8bf6e88a52edf945e';
const REDIRECT_URI = 'http://localhost:8080/callback/spotify'; // Must match Spotify dashboard

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
