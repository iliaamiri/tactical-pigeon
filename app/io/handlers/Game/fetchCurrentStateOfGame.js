// Repos
const Games = include("app/repos/Games");
const {Players} = include("app/repos/Players");

// Exceptions
const GameExceptions = include("core/Exceptions/GameExceptions");

module.exports = (io, socket) => {
  return (gameId) => {
    console.log("fetch current state of game"); // debug
    // Check if any game with this `gameId` exists or not.
    const game = Games.find(gameId);
    if (!game) {
      socket.emit(':error', GameExceptions.gameNotFound);
      return;
    }

    // Get players of the found game.
    const players = game.players;

    // Find this player who requested a game fetch and verify if they are in this game or not.
    const thisPlayerId = Object.values(players)
      .find(_playerId => _playerId === socket.user.playerId);
    if (!thisPlayerId) {
      // For security, don't tell the noisy people if the game even exists or not.
      socket.emit(':error', GameExceptions.gameNotFound);
      return;
    }

    // Get opponent's playerId
    const otherPlayerId = Object.values(players)
      .find(_playerId => _playerId !== socket.user.playerId);

    // Find opponent's player object.
    let otherPlayer = Players.findActiveUserById(otherPlayerId);

    let thisPlayerMoveHistory = [];
    let otherPlayerMoveHistory = [];
    game.rounds.forEach(round => {
      if (!round.movesCompleted()) {
        return;
      }

      // Get my move history of the game.
      thisPlayerMoveHistory.push(round.moves[socket.user.playerId]);

      // Get my opponent's move history of the game.
      otherPlayerMoveHistory.push(round.moves[otherPlayer.playerId]);
    });

    // Construct my information (my ammo, my lives, my move history).
    const playerMe = {
      username: socket.user.username,
      ammoInventories: socket.user.ammoInventory?.toJSON() || null,
      lives: socket.user.life?.toJSON() || null,
      moveHistory: thisPlayerMoveHistory,
    };

    // Construct my opponent's information (their ammo, their lives, their move history)
    const playerOpponent = {
      username: otherPlayer.username,
      ammoInventories: otherPlayer.ammoInventory?.toJSON() || null,
      lives: otherPlayer.life?.toJSON() || null,
      moveHistory: otherPlayerMoveHistory,
    };

    let currentRound = game.getCurrentRound();

    // Prepare the payload for me.
    const payload = {
      playerMe,
      playerOpponent,
      gameComplete: game.gameComplete,
      timeLeft: currentRound?.getTimeLeftTilRoundFinishes()
    };

    // console.log("fetch payload: ", payload); // debug

    // Send me my payload.
    socket.emit("game:fetch:result", payload);
  };
};