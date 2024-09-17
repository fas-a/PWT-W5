const express = require('express');
const app = express();
const port = 3000;

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
    }, 1000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

app.listen(port, () => {
    console.log(`SSE server listening on http://localhost:${port}`);
});
