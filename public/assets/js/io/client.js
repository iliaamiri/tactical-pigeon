import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import Token from './auth/Token.js';

export let socket;

export default function clientSocketConnect() {
    Token.fetchCachedToken();
    socket = io("/", { auth: Token.tokenVal });




    socket.on("connect", () => {
        console.log("Connected.");
    })

    socket.io.on("reconnection_attempt", () => {
        console.log("reconnection attempt");
    });

    socket.io.on("reconnect", () => {
        console.log("reconnect");
    });

    socket.on("connect_failed", msg => {
        console.log('connect_failed: ', msg);
    });

    socket.on("disconnect", (test) => {
        console.log("disconnect: ", test);
        console.log(socket.id); // undefined
    });

    socket.on("connect_error", err => {
        console.log('connect_error: ', err);
    });


    return socket;
}