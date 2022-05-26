// import {io} from "socket.io-client"; // for webpack
import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import Token from './auth/Token.js';

import handlersIndex from "./handlersIndex.js";

export let socket;

export default async function clientSocketConnect() {
  Token.fetchCachedToken();
  if (!Token.tokenVal) {
    // console.log("Auth Failed"); // debug
    return;
  }

  socket = io("/", {
    auth: { token: Token.tokenVal}
  });

  console.log(socket); // debug

  try {
    await handlersIndex(io, socket);
  } catch (err) {
    console.log(err);
  }

  socket.on("connect", () => {
    console.log("Connected.");
  });

  socket.io.on("reconnect_attempt", () => {
    console.log("reconnection attempt");
  });

  socket.io.on("reconnect", () => {
    console.log("reconnect");
  });

  socket.io.on("error", (err) => {
    console.log("-----------------", err);
  });

  socket.on("connect_failed", msg => {
    console.log('connect_failed: ', msg);
  });

  socket.on("disconnect", () => {
    console.log("disconnect: socket.id should be undefined: ", socket.id);
  });

  socket.on("connect_error", err => {
    console.log('connect_error: ', err, err.message);
  });

  // Custom error
  socket.on(":error", err => {
    console.log("App Error: ", err);
  });

  return socket;
}