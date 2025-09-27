import http from 'http';
import cfg from './config/config.js';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import { shortenUrl, getUrlFromCode } from './utils/url-shortener.js';

// Get __dirname in ES module scope
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Express framework for handling HTTP requests
const app = express();
const server = http.createServer(app);

// WebSocket server for real-time communication
const wss = new WebSocketServer({ server });
const clients = new Map();

// CORS configuration
const corsOptions = {
    origin: cfg.reactApp.url, // Alow requests from the react app
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static page for testing
app.use('/', express.static(path.join(__dirname, '../public')));

// Post /url endpoint
app.post('/url', (req, res) => {
    console.log('Received POST /url request');

    // Extract URL and session ID from request
    const { url } = req.body;
    const sessionId = req.header('X-Session-Id');

    // Check if session ID is provided
    if (!sessionId || !clients.has(sessionId)) {
        console.error('Session ID is missing or invalid!');
        return res.status(400).json({ error: 'Session ID is required' });
    }

    console.log('Session ID:', sessionId);

    // Check if URL is provided and valid
    if (!url || typeof url !== 'string' || url.trim() === '') {
        console.error('URL is missing or invalid!');
        // Return an error response if URL is missing
        return res.status(400).json({ error: 'URL is required' });
    }

    // Shorten the URL
    const shortenedURL = shortenUrl(cfg.serverUrl, url);
    console.log(`Shortened URL: ${shortenedURL}`);

    // Retrieve the WebSocket connection for this session
    const wsConnection = clients.get(sessionId);

    // Send the shortened URL back via WebSocket
    if (wsConnection && wsConnection.readyState === wsConnection.OPEN) {
        wsConnection.send(JSON.stringify({ shortenedURL }));
        console.log('Sent shortened URL via WebSocket!');
    }

    // Respond to the HTTP request
    res.status(200).json({ message: 'Shortened URL sent via WebSocket!' });
});

// GET /:code endpoint
app.get('/:code', (req, res) => {
    console.log('Received GET /:code request');

    const { code } = req.params;

    if (!code || typeof code !== 'string' || code.trim() === '') {
        console.error('Code is missing or invalid!');
        return res.status(400).json({ error: 'Code is required' });
    }

    // Retrieve the original URL
    const originalUrl = getUrlFromCode(code);

    // Return the original URL or 404 if not found
    if (originalUrl) {
        res.status(200).json({ url: originalUrl });
    } else {
        res.status(404).json({ error: 'URL not found' });
    }
});

// WebSocket connection handling
wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection established');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.sessionId) {
            // Store the WebSocket connection with the session ID
            clients.set(data.sessionId, ws);
            console.log(`Saved session ID: ${data.sessionId}`);
        }
    });
});

// Start the server
server.listen(cfg.port, cfg.host, () => {
    console.log(`Server running at http://${cfg.host}:${cfg.port}/`);
});