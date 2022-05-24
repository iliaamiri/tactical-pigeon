// Repos
const {Players} = require("../../repos/Players");
const Games = require("../../repos/Games");

module.exports = (io, socket) => {
  const handler = (reason) => {
    // Remove player's socketId and count them as disconnected.
    Players.disconnected(socket.user);

    // Check if the player is currently in a game or not at the moment. Ignore the rest if they are not.
    if (!socket.user.currentGameIdPlaying) {
      return;
    }

    let onGoingGame = Games.find(socket.user.currentGameIdPlaying);
    // If they were currently in a game:
    if (!onGoingGame || onGoingGame.gameComplete) {
      return;
    }

    if (!onGoingGame.areBothPlayersReady()) {
      return;
    }

    console.log("socket user disconnected? ", socket.user); // debug
    // If there is already a `setTimeout` going through process, Ignore the rest.
    if (socket.user.disconnectDetectionSetTimoutId) {
      return;
    }

    // opponentDisconnected
    // Try finding the opponent player in the game, and emit them the "game:won:opponentLeft"
    const opponentPlayerId = onGoingGame.players.find(playerId => playerId !== socket.user.playerId);
    const opponentPlayer = Players.fetchThePlayerById(opponentPlayerId) || null;
    if (opponentPlayer) {
      // Tell the other player that this player disconnected.
      io.to(opponentPlayer.socketId).emit("game:opponentDisconnected");
    }

    // Give them 20 seconds to see if they will come back or not.
    socket.user.disconnectDetectionSetTimoutId = setTimeout(() => {
      console.log("user", socket.user); // debug
      console.log("is the user online: ", socket.user.isOnline()); // debug

      // If this player was connected, tell the opponent that this player got reconnected.
      if (socket.user.isOnline()) {
        if (opponentPlayer) {
          // Tell the other player that this player disconnected.
          io.to(opponentPlayer.socketId).emit("game:opponentReconnected");
        }
      }

      // If the user still wasn't online
      if (!socket.user.isOnline()) {
        // Try emitting them the "game:won:opponentLeft"
        if (opponentPlayer) {
          // Tell the other player that the game ended, and they won because their opponent left.
          io.to(opponentPlayer.socketId).emit("game:won:opponentLeft");
        }

        // End the ongoing game (announce the opponent as the winner of the game if applicable).
        onGoingGame.end(socket.user, opponentPlayer, opponentPlayer);
        socket.user.cleanUpAfterGame();
        opponentPlayer.cleanUpAfterGame();
      }

      // Reset player's timeout cool-down for any future disconnection.
      socket.user.disconnectDetectionSetTimoutId = null;
    }, 10 * 1000);
  };

  socket.on("disconnect", handler);
};