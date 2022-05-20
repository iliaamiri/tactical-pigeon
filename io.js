const userAuthMiddleware = require("./app/io/middlewares/userAuth");

const gameHandler = require("./app/io/handlers/gameHandler");
const {Players} = require("./app/repos/Players");

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
      // Check if the player is in a game or not at the moment
      // If they were currently in a game,
      Players.makeOffline(socket.user);
    });
  });

  io.on('error', async (err) => {
    console.log("ERROR: ", err);
  });

  return io;
}