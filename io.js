const userAuthMiddleware = require("./app/io/middlewares/userAuth");

const gameHandler = require("./app/io/handlers/gameHandler");

module.exports = (server) => {
  const io = require('socket.io')(server);

  io.use(userAuthMiddleware);

  io.on('connection', async (socket) => {
    console.log("ayooooo")
    try {
      await gameHandler(io, socket);
    } catch (err) {
      console.log(err);
    }
  });

  io.on('error', async (err) => {
    console.log("hey");
  });

  return io;
}