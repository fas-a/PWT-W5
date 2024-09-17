const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = 3000;

// Serve static files (HTML client)
app.use(express.static('public'));

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send a message every second
    const interval = setInterval(() => {
        const message = JSON.stringify({ time: new Date() });
        ws.send(message);
    }, 1000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

app.listen(port, () => {
    console.log(`WebSocket server listening on http://localhost:${port}`);
});
