const express = require('express');
const app = express();
const port = 3000;

let sseMessageCount = 0; // Hitung pesan yang dikirim

// Serve static files (HTML client)
app.use(express.static('public'));

// SSE Endpoint
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const interval = setInterval(() => {
        const message = `data: ${JSON.stringify({ time: new Date() })}\n\n`;
        res.write(message);
        sseMessageCount++; // Increment count
    }, 500);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
        console.log(`Total SSE messages sent: ${sseMessageCount}`);
    });
});

app.listen(port, () => {
    console.log(`SSE server listening on http://localhost:${port}`);
});
