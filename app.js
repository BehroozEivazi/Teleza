const http = require("http");
const path = require("path");
const rootDir = require("./common/path");
const dotEnv = require("dotenv");

const express = require("express");
const { Server } = require("socket.io");
dotEnv.config({ path: path.join(rootDir, "config", "config.env") });

require("./common/db");
const badyParser = require("body-parser");
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);

const BaseRouter = require("./routes/index");
app.use(badyParser.urlencoded({ extended: false }));
app.use("/api", BaseRouter);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log("server running on port 3000");
});

// var users = {};
// io.on("connection", (socket) => {
//     socket.on("login", (nikname) => {
//         users[socket.id] = nikname;
//         io.sockets.emit("online", users);
//     });

//     socket.on("disconnect", (user) => {
//         delete users[socket.id];
//         io.sockets.emit("online", users);
//     });

//     socket.on("chat-message", (data) => {
//         io.sockets.emit("chat-message", data);
//     });

//     socket.on("typing", (data) => {
//         socket.broadcast.emit("typing", data);
//     });
// });
