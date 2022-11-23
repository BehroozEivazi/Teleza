const http = require("http");

const express = require("express");
const socket = require("socket.io");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(__dirname + "/public"));

httpServer.listen(3000, () => {
    console.log("server running on port 3000");
});

var users = {};
io.on("connection", (socket) => {
    socket.on("login", (nikname) => {
        users[socket.id] = nikname;
        io.sockets.emit("online", users);
    });

    socket.on("disconnect", (user) => {
        delete users[socket.id];
        io.sockets.emit("online", users);
    });

    socket.on("chat-message", (data) => {
        io.sockets.emit("chat-message", data);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});
