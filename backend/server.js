
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get the Twitch authorization URL
app.get('/auth-url', (req, res) => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const SCOPES = process.env.SCOPES;

    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(SCOPES)}`;
    res.json({ url: authUrl });
});

// Route to handle Twitch API requests with a token
app.get('/twitch-data', (req, res) => {
    const token = req.headers.authorization;
    const CLIENT_ID = process.env.CLIENT_ID;

    axios.get('https://api.twitch.tv/helix/some-endpoint', {
        headers: {
            'Client-ID': CLIENT_ID,
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: error.message }));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
