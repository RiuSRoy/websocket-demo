### Create a client

Open a console in any browser and start typing
* let ws = new WebSocket("ws://localhost:8080");
* ws.onmessage = message => console.log("We received a msg " + message.data);
* ws.send("hello babes!, please stop spamming");