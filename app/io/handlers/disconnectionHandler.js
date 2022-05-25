// Repos
const {Players} = require("../../repos/Players");
const Games = require("../../repos/Games");

module.exports = async (io, socket) => {
  const handler = (reason) => {
    // Remove player's socketId and count them as disconnected.
    Players.disconnected(socket.user);

    console.log("------------------------------------------------------------ disconnected", socket.user.playerId)

    // Check if the player is currently in a game or not at the moment. Ignore the rest if they are not.
    if (!socket.user.currentGameIdPlaying) {
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
      console.log("------------------------- Disconnection process still in progress");
      return;
    }

    // Disconnected before the game started
    if (!onGoingGame.areBothPlayersReady() && !socket.user.disconnectDetectionWhileTransitioningBetweenPages_SetTimeoutId) {
      disconnectedBeforeGoingToGame(onGoingGame);
      return;
    }

    if (!onGoingGame.areBothPlayersReady()) {
      return;
    }

    // opponentDisconnected
    // Try finding the opponent player in the game, and emit them the "game:won:opponentLeft"
    const opponentPlayerId = onGoingGame.players.find(playerId => playerId !== socket.user.playerId);
    const opponentPlayer = Players.fetchThePlayerById(opponentPlayerId) || null;
    console.log(opponentPlayer)
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
        if (opponentPlayer.socketId) {
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

  function disconnectedBeforeGoingToGame(onGoingGame) {
    console.log("---------- DC before going to game");
    socket.user.disconnectDetectionWhileTransitioningBetweenPages_SetTimeoutId = setTimeout(() => {
      const opponentPlayerId = onGoingGame.players.find(playerId => playerId !== socket.user.playerId);
      const opponentPlayer = Players.fetchThePlayerById(opponentPlayerId) || null;
      if (!socket.user.isOnline()) {
        if (!onGoingGame.isPlayerReady(opponentPlayer.playerId)) {
          // End the ongoing invalid game. Since neither of the players showed up ready, their game is announced as draw.
          onGoingGame.end(socket.user, opponentPlayer, null);
          socket.user.cleanUpAfterGame();
          opponentPlayer.cleanUpAfterGame();
          return;
        }

        // Try emitting them the "game:won:opponentLeft"
        if (opponentPlayer.socketId) {
          // Tell the other player that the game ended, and they won because their opponent left.
          io.to(opponentPlayer.socketId).emit("game:won:opponentLeft:beforeGameStarted");
        }

        // End the ongoing game (announce the opponent as the winner of the game if applicable).
        onGoingGame.end(socket.user, opponentPlayer, opponentPlayer);
        socket.user.cleanUpAfterGame();
        opponentPlayer.cleanUpAfterGame();
      }

      // Reset player's timeout cool-down.
      socket.user.disconnectDetectionWhileTransitioningBetweenPages_SetTimeoutId = null;
    }, 13 * 1000);
  }

  socket.on("disconnect", handler);
};