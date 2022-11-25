const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

exports.socks = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: "*",
            allowedHeaders: "*",
            credentials: "*",
        },
    });
    // io.use((socket, next) => {
    //     let auth = socket.handshake.auth;
    //     if (auth && auth.Token) {
    //         jwt.verify(auth.Token, process.env.SECRET_JWT, (err, decoded) => {
    //             if (err) next(new Error("Authentication error"));
    //             socket.decoded = decoded;
    //             next();
    //         });
    //     } else {
    //         next(new Error("Authentication error"));
    //     }
    // });

    const users = {};

    const socketToRoom = {};

    io.on("connection", (socket) => {
        socket.on("join room", (roomID) => {
            if (users[roomID]) {
                const length = users[roomID].length;
                if (length === 4) {
                    socket.emit("room full");
                    return;
                }
                users[roomID].push(socket.id);
            } else {
                users[roomID] = [socket.id];
            }
            socketToRoom[socket.id] = roomID;
            const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

            socket.emit("all users", usersInThisRoom);
        });

        socket.on("sending signal", (payload) => {
            io.to(payload.userToSignal).emit("user joined", {
                signal: payload.signal,
                callerID: payload.callerID,
            });
        });

        socket.on("returning signal", (payload) => {
            io.to(payload.callerID).emit("receiving returned signal", {
                signal: payload.signal,
                id: socket.id,
            });
        });

        socket.on("disconnect", () => {
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                room = room.filter((id) => id !== socket.id);
                users[roomID] = room;
            }
        });
    });
};
