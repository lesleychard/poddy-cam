import {init, stop} from './actions';

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use(
    session({
        store: new FileStore,
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(bodyParser.json());

app.post('/init', async (req, res) => {
    const initData = await init(req.session, req.body.code);
    res.send(JSON.stringify(initData));
});

app.post('/start', async (req, res, next) => {
    // @TODO start stream
});

app.post('/stop', () => {
    stop();
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on port ${process.env.APP_PORT}`);
});
