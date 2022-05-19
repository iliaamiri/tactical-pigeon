const userAuthMiddleware = require("./app/io/middlewares/userAuth");

const gameHandler = require("./app/io/handlers/gameHandler");

module.exports = (server) => {
  const io = require('socket.io')(server);

  io.use(userAuthMiddleware);

  io.on('connection', async (socket) => {
    console.log("Connected. User: ", socket.user.username);
    try {
      await gameHandler(io, socket);
    } catch (err) {
      console.log("socket error: ", err);
    }

    socket.on("disconnect", (err) => {
      socket.user.socketId = null;
      socket.user.reSyncInRepo();
    });
  });

  io.on('error', async (err) => {
    console.log("ERROR: ", err);
  });

  return io;
}