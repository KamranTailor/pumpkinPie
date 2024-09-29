import express from 'express';
import fetch from 'node-fetch'; // Ensure you import fetch from node-fetch
import { v4 as uuidv4 } from 'uuid'; // Not used in the current snippet
import path from 'path'; // Not used in the current snippet
import { fileURLToPath } from 'url'; // Not used in the current snippet

const router = express.Router();

// 1. Route for Spotify Authentication
router.post('/', async (request, response) => {
    try {
        const { accessToken} = request.body; // Accepting limit and market from the request body

        if (!accessToken) {
            return response.status(400).json({ status: false, message: 'Access token is required.' });
        }

        const endpoints = {
            me: 'https://api.spotify.com/v1/me',
            playlists: 'https://api.spotify.com/v1/me/playlists',
            topTracks: 'https://api.spotify.com/v1/me/top/tracks',
            topArtists: 'https://api.spotify.com/v1/me/top/artists',
        };

        // Function to fetch data from an endpoint
        async function fetchData(url) {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            return await res.json();
        }

        // Fetch data from all endpoints
        const playlists = await fetchData(endpoints.playlists);
        const topTracks = await fetchData(endpoints.topTracks);
        const topArtists = await fetchData(endpoints.topArtists);

        // Prepare seed artists and tracks for recommendations
        const seedArtists = topArtists.items.map(artist => artist.id).slice(0, 3); // Use up to 5 top artists

        const seedTracks = topTracks.items.map(track => track.id).slice(0, 2); // Use up to 5 top tracks

        let recommendationsUrl = `
        https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists.join(',')}&seed_tracks=${seedTracks.join(',')}`;

        //const recommendations = await fetchData(recommendationsUrl);

        // Return all fetched data
        response.json({
            status: true,
            playlists,
            topTracks,
            topArtists
        });
    } catch (error) {
        console.error('Error fetching Spotify data:', error.message);
        response.status(500).json({ status: false, message: error.message });
    }
});

export default router;
