var http = require('http');
var WebSocketServer = require('websocket').server;

var connectionArray = [];
var nextID = 0;

var server = http.createServer(function(request, response) {
    console.log((new Date()) + " Received request for " + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(6502, function() {
    console.log((new Date()) + " Server is listening on port 6502");
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true // You should use false here!
});

wsServer.on('connect', function(connection) {
    console.log((new Date()) + " Connection accepted.");
    connectionArray.push(connection);

    connection.clientID = nextID;
    nextID++;

    var msg = {
        type: "id",
        id: connection.clientID
    };
    connection.sendUTF(JSON.stringify(msg));

    connection.on('message', function (message) {
        console.log(message);
    });
});