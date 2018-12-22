const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

obs.connect({
    address: `localhost:${process.env.OBS_WS_PORT}`,
    password: process.env.OBS_WS_PASSWORD,
});

app.use(bodyParser.json());

app.post('/start', (req) => {
    const key = req.body.streamKey;
    console.log(`Starting OBS stream ${key}...`)
    obs.send('StartStreaming', {
        stream: {
            settings: {
                key,
            },
        },
    });
});

app.post('/stop', () => {
    console.log(`Stopping OBS stream...`)
    obs.send('StopStreaming');
});

app.listen(process.env.OBS_HTTP_PORT, () => {
    console.log(`OBS is listening on port ${process.env.OBS_HTTP_PORT}`);
});