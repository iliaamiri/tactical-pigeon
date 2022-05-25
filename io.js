// Middlewares
const userAuthMiddleware = require("./app/io/middlewares/userAuth");

// Handlers
const gameHandler = require("./app/io/handlers/Game/gameHandler");
const disconnectionHandler = require('./app/io/handlers/disconnectionHandler');

module.exports = (server) => {
  const io = require('socket.io')(server, { // Options:
    // For later use. Probably will be needed a change (doesn't have any purpose now)
    pingTimeout: 30000,
    pingInterval: 10000
  });

  io.use(userAuthMiddleware);

  io.on('connection', async (socket) => {
    console.log("Connected. User: ", socket.user.username);
    try {
      await gameHandler(io, socket);
      await disconnectionHandler(io, socket);
    } catch (err) {
      console.log("socket error: ", err);
    }
  });

  io.on('error', async (err) => {
    console.log("ERROR: ", err);
  });

  return io;
}