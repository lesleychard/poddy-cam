import {
    init,
    play,
    start,
    stop,  
} from './actions';

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(
    session({
        store: new FileStore,
        // @TODO change this to random string from .env
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(bodyParser.json());

app.post('/init', async (req, res) => {
    const initData = await init(req.session, req.body.code);
    res.send(JSON.stringify(initData));
});

app.post('/start', async (req, res) => {
    const inserts = await start(req.session);
    res.send(JSON.stringify(inserts));
});

app.get('/stream/broadcast/:broadcastId/stream/:streamId', async (req, res, next) => {
    const broadcastId = req.params.broadcastId;
    const streamId = req.params.streamId;
    res.render('stream', {id: broadcastId});
});

app.post('/play/broadcast/:broadcastId/stream/:streamId', async (req, res) => {
    const broadcastId = req.params.broadcastId;
    const streamId = req.params.streamId;
    play(broadcastId, streamId);
});

app.post('/stop/broadcast/:broadcastId/stream/:streamId', async (req, res) => {
    const broadcastId = req.params.broadcastId;
    const streamId = req.params.streamId;
    stop(broadcastId, streamId);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on port ${process.env.APP_PORT}`);
});
