// import {io} from "socket.io-client"; // for webpack
import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import Auth from "../auth/Auth.js";
import handlersIndex from "./handlersIndex.js";

export let socket;

export default async function clientSocketConnect() {
  if (!Auth.isLoggedIn) {
    console.error("Auth Failed. User is not logged-in and yet socket client is being called to connect to the web socket." +
      "Code must not reach here without user being logged-out!");
    return;
  }

  let tokenValue = Auth.jwtToken;

  socket = io("/", {
    auth: { token: tokenValue}
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