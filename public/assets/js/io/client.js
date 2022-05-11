import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import Token from '../io/Token.js';

export function connect() {
    Token.fetchCachedToken();
    const socket = io({ auth: Token.tokenVal });

    socket.on("connection_error", err => {
        console.log(err);
        
    });
}