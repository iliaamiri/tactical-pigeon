// Repos
const {Players} = require("../../repos/Players");
const Games = require("../../repos/Games");
const Player = require("../../models/Player");

module.exports = async (io, socket) => {
  const handler = async (reason) => {
    console.log("Reason of disconnection (socket.io said): ", reason); // debug

    // Remove player's socketId and count them as disconnected.
    Players.disconnected(socket.user);

    console.log("------------------------------------------------------------ disconnected", socket.user.playerId); // debug

    // Check if the player is currently in a game or not at the moment. Ignore the rest if they are not.
    if (!socket.user.currentGameIdPlaying) {
      if (Players.isInMatchQueue(socket.user.playerId) && !socket.user.disconnectDetectionSetTimoutId) {
        disconnectedWhileFindingTheOpponent(1500);
      }
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
      console.log("------------------------- Disconnection process still in progress"); // debug
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
    const opponentPlayer = await Players.fetchThePlayerById(opponentPlayerId, Player) || null;
    console.log(opponentPlayer); // debug
    if (opponentPlayer) {
      // Tell the other player that this player disconnected.
      io.to(opponentPlayer.socketId).emit("game:opponentDisconnected");
    }

    // Give them 20 seconds to see if they will come back or not.
    disconnectedInTheMiddleOfTheGame(onGoingGame, opponentPlayer);
  };

  function disconnectedWhileFindingTheOpponent(timeout_ms = 5 * 1000) {
    console.log("---------- DC while finding an opponent");
    socket.user.disconnectDetectionSetTimoutId = setTimeout(() => {
      if (!socket.user.isOnline()) {
        console.log("------ Removing user from the match queue...", socket.user.username); // debug
        Players.removeFromMatchQueue(socket.user.playerId);
      }

      // Reset player's timeout cool-down.
      socket.user.disconnectDetectionSetTimoutId = null;
    }, timeout_ms);
  }

  function disconnectedBeforeGoingToGame(onGoingGame, timeout_ms = 13 * 1000) {
    console.log("---------- DC before going to game");
    socket.user.disconnectDetectionWhileTransitioningBetweenPages_SetTimeoutId = setTimeout(async () => {
      const opponentPlayerId = onGoingGame.players.find(playerId => playerId !== socket.user.playerId);
      const opponentPlayer = await Players.fetchThePlayerById(opponentPlayerId, Player) || null;
      if (!socket.user.isOnline()) {
        if (!onGoingGame.isPlayerReady(opponentPlayer.playerId)) {
          // End the ongoing invalid game. Since neither of the players showed up ready, their game is announced as draw.
          onGoingGame.end(socket.user, opponentPlayer, null);
          socket.user.cleanUpAfterGame();
          opponentPlayer.cleanUpAfterGame();
          return;
        }

        // Try emitting them the "game:won:opponentLeft"
        if (opponentPlayer?.socketId) {
          // Tell the other player that the game ended, and they won because their opponent left.
          io.to(opponentPlayer.socketId).emit("game:won:opponentLeft:beforeGameStarted");
        }

        // End the ongoing game (announce the opponent as the winner of the game if applicable).
        onGoingGame.end(socket.user, opponentPlayer, opponentPlayer);
        socket.user.cleanUpAfterGame();
        opponentPlayer?.cleanUpAfterGame();
      }

      // Reset player's timeout cool-down.
      socket.user.disconnectDetectionWhileTransitioningBetweenPages_SetTimeoutId = null;
    }, timeout_ms);
  }

  function disconnectedInTheMiddleOfTheGame(onGoingGame, opponentPlayer, timeout_ms = 10 * 1000) {
    console.log("---------- DC in the middle of the game");
    socket.user.disconnectDetectionSetTimoutId = setTimeout(() => {
      console.log("user", socket.user); // debug
      console.log("opponentPlayer", opponentPlayer); // debug
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
        if (opponentPlayer?.socketId) {
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
    }, timeout_ms);
  }

  socket.on("disconnect", handler);
};