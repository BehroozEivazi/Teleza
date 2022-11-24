import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import utils from "../../common/utils";
import { BASE_URL_API } from "../../constant/routes";

const socket = io(BASE_URL_API, {
    auth: {
        Token: utils.userInfo().token,
    },
});

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        socket.on("connect", (data) => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("pong", (ddd) => {
            console.log(ddd);
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
            socket.off("ping");
        };
    }, []);

    const sendPing = () => {
        socket.emit("ping", "behrooz");
    };

    return (
        <div>
            <p>Connected: {"" + isConnected}</p>
            <p>Last pong: {lastPong || "-"}</p>
            <button onClick={sendPing}>Send ping</button>
        </div>
    );
}

export default App;
