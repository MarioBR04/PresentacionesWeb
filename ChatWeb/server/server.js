const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080, host: "0.0.0.0" });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log("Received: " + message);
    socket.send("Echo: " + message);

    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("Server started on port 8080");
