import {init, start, stop} from './actions';

const dotenv = require('dotenv');
const http = require('http');
const WebSocketServer = require('websocket').server;

const authClient = require('./auth/authClient');

dotenv.config();

const connectionArray = [];
let nextID = 0;

const server = http.createServer(function(request, response) {
    console.log((new Date()) + " Received request for " + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(process.env.APP_PORT, function() {
    console.log(`
        ${new Date()} Server is listening on port ${process.env.APP_PORT}
    `);
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true // You should use false here!
});

wsServer.on('connect', function(connection) {
    console.log((new Date()) + " Connection accepted.");
    connectionArray.push(connection);

    connection.clientID = nextID;
    nextID++;

    connection.on('message', function (message) {
        const messageObj = JSON.parse(message.utf8Data);
        switch (messageObj.action) {
            case 'start':
                start(connection, messageObj.code);
                break;
            default:
                stop();
        }
    });
});