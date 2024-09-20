const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = 2080;

// Serve static files (HTML client)
app.use(express.static('public'));

let wsMessageCount = 0; // Hitung pesan yang dikirim

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send a message every second
    const interval = setInterval(() => {
        const message = JSON.stringify({ time: new Date() });
        ws.send(message);
        wsMessageCount++; // Increment count
    }, 500);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
        console.log(`Total WebSocket messages sent: ${wsMessageCount}`);
    });
});

app.listen(port, () => {
    console.log(`WebSocket server listening on http://localhost:${port}`);
});
