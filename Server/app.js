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

const BaseRouter = require("./routes/index");
const Validator = require("./validator/Validator");
const jwt = require("jsonwebtoken");
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "*");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
app.use(badyParser.urlencoded({ extended: false }));
app.use("/api", BaseRouter);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: "*",
        credentials: "*",
    },
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log("server running on port 3000");
});

io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.Token) {
        jwt.verify(socket.handshake.auth.Token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) next(new Error("Authentication error"));
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error("Authentication error"));
    }
});

var users = {};

io.on("connection", (socket) => {
    socket.on("ping", (nikname) => {
        socket.emit("pong", "boro ridam dahanet");
    });

    socket.on("disconnect", (user) => {
        // socket.emit("disconnect", users);
    });

    socket.on("chat-message", (data) => {
        io.sockets.emit("chat-message", data);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});
