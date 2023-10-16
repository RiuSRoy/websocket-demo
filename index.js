const http = require('http');
const WebSocketServer = require('websocket').server;

const httpServer = http.createServer((req, res) => {
    console.log("we have received a request");
});

const websocket = new WebSocketServer({
    "httpServer": httpServer
})

let connection = null;
websocket.on("request", req => {
    connection = req.accept(null, req.origin);
    connection.on("error", e => {
        console.log("Error connecting to websocket for update events: " + e);
    })
    connection.on("message", message => {
        console.log("received message: " + message.utf8Data)
    })

    sendEvery5Seconds();
})

httpServer.listen(8080, () => console.log("My server is listening on port " + 8080));

function sendEvery5Seconds() {
    connection.send(`message from server: ${Math.random()}`)

    setTimeout(sendEvery5Seconds, 5000);
}