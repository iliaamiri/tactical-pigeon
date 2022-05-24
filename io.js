// Middlewares
const userAuthMiddleware = require("./app/io/middlewares/userAuth");

// Handlers
const gameHandler = require("./app/io/handlers/gameHandler");

// Repos
const {Players} = require("./app/repos/Players");
const Games = require("./app/repos/Games");

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
    } catch (err) {
      console.log("socket error: ", err);
    }

    socket.on("disconnect", (reason) => {
      // Remove player's socketId and count them as disconnected.
      Players.disconnected(socket.user);

      // Check if the player is currently in a game or not at the moment. Ignore the rest if they are not.
      if (socket.user.currentGameIdPlaying) {
        return;
      }

      let onGoingGame = Games.find(socket.user.currentGameIdPlaying);
      // If they were currently in a game:
      if (!onGoingGame || onGoingGame.gameComplete) {
        return;
      }

      console.log("socket user disconnected? ", socket.user); // debug
      // If there is already a `setTimeout` going through process, Ignore the rest.
      if (socket.user.disconnectDetectionSetTimoutId) {
        return;
      }

      // Give them 20 seconds to see if they will come back or not.
      socket.user.disconnectDetectionSetTimoutId = setTimeout(() => {
        console.log("user", socket.user); // debug
        console.log("is the user online: ", socket.user.isOnline()); // debug

        // If the user still wasn't online
        if (!socket.user.isOnline()) {
          // Try finding the opponent player in the game, and emit them the "game:won:opponentLeft"
          const opponentPlayerId = onGoingGame.players.find(playerId => playerId !== socket.user.playerId);
          const opponentPlayer = Players.fetchThePlayerById(opponentPlayerId) || null;
          if (opponentPlayer) {
            // Tell the other player that the game ended, and they won because their opponent left.
            io.to(opponentPlayer.socketId).emit("game:won:opponentLeft");
          }

          // End the ongoing game (announce the opponent as the winner of the game if applicable).
          onGoingGame.end(socket.user, opponentPlayer, opponentPlayer);
        }

        // Reset player's timeout cool-down for any future disconnection.
        socket.user.disconnectDetectionSetTimoutId = null;
      }, 20 * 1000);
    });
  });

  io.on('error', async (err) => {
    console.log("ERROR: ", err);
  });

  return io;
}