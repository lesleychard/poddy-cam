import {start, stop} from './actions';

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
    })
);

app.post('/start', (req, res, next) => {
    start(req.code);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on port ${process.env.APP_PORT}`);
});
