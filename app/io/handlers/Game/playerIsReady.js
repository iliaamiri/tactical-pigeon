// Repos
const Games = include("app/repos/Games");
const {Players} = include("app/repos/Players");

// Models
const Round = include("app/models/Round");

// Exceptions
const GameExceptions = include("core/Exceptions/GameExceptions");

module.exports = (io, socket) => {
  return (gameId) => {
    // Find the game by gameId
    console.log("PLAYER IS READY", gameId, socket.user.playerId); // debug
    const foundGame = Games.find(gameId);
    if (!foundGame) {
      socket.emit(':error', GameExceptions.gameNotFound);
      return;
    }

    // Get players of the found game.
    const playersIds = foundGame.players;

    // Find this player who requested a game fetch and verify if they are in this game or not.
    const thisPlayerId = Object.values(playersIds)
      .find(_playerId => _playerId === socket.user.playerId);
    if (!thisPlayerId) {
      // For security, don't tell the noisy people if the game even exists or not.
      socket.emit(':error', GameExceptions.gameNotFound);
      return;
    }

    clearTimeout(socket.user.disconnectDetectionWhileTransitioningBetweenPages_SetTimeoutId);
    socket.user.disconnectDetectionWhileTransitioningBetweenPages_SetTimeoutId = null;

    // If both players are ALREADY ready, don't over-do the purpose of this handler.
    // Purpose of the next if statement: If the player refreshes or something, this will still tell that the game is ready
    if (foundGame.areBothPlayersReady()) {
      socket.emit("game:ready:start");
      return;
    }

    foundGame.playersReadyStatus[thisPlayerId] = true;
    console.log("are both players ready", foundGame.areBothPlayersReady());
    // If both of the players of the game were ready.
    if (foundGame.areBothPlayersReady()) {
      // Get opponent's playerId
      const otherPlayerId = Object.values(playersIds)
        .find(_playerId => _playerId !== socket.user.playerId);

      // Find opponent's player object.
      let otherPlayer = Players.findActiveUserById(otherPlayerId);

      // Tell both players that everyone is ready, so the round can start from now.
      io.to(socket.user.socketId).emit("game:ready:start");
      io.to(otherPlayer.socketId).emit("game:ready:start");

      // Actually start the first round now.
      setTimeout(() => {
        foundGame.nextRound();
      }, Round.timeDelay);
    }
  };
};