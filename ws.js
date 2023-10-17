const http = require('http');
const { WebSocketServer } = require('ws');
const WebSocket = require('ws');

const httpServer = http.createServer((req, res) => {
    console.log("we have received a request");
});

const wss = new WebSocketServer({
    "server": httpServer
})

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    // Broadcast to all clients
    ws.on('message', function message(data, isBinary) {
        const event = JSON.parse(data.toString());
        const eventChannel = event.channel;
        if (eventChannel === "poll_response") {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`Broadcast updated Poll Results at ${Date.now()}`, { binary: isBinary });
                }
            });
        }
    });

});
  

httpServer.listen(8080, () => console.log("My server is listening on port " + 8080));

function sendEvery5Seconds() {
    ws.send(`message from server: ${Math.random()}`)

    setTimeout(sendEvery5Seconds, 5000);
}