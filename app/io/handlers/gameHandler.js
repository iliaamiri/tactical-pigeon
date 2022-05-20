// Exceptions
const GameExceptions = require("../../../core/Exceptions/GameExceptions");

// Models
const Move = require("../../models/Move");
const Round = require("../../models/Round");

// Repos
const Games = require("../../repos/Games");
const Players = require("../../repos/Players").Players;

// Helpers
const lifeAccountingAndRoundEvaluation = require("../helpers/roundSubmitMove/lifeAccountingAndRoundEvaluation");
const preparePayloadAndEmit = require("../helpers/roundSubmitMove/preparePayloadAndEmit");

module.exports = async (io, socket) => {
  // socket.user : ref to Player : authenticated player.

  /**
   * Callback function for `game:searchForOpponent` event. This will add the player who wants to play, to the matching queue.
   * If there were more than or equal to 2 players in the queue, an event will be emitted and matches two players.
   */
  const searchForOpponent = () => {
    // Do not allow a player who is already in the match to be added to the queue.
    if (Players.isInMatchQueue(socket.user.playerId)) {
      socket.emit(':error', GameExceptions.playerAlreadyInMatchQueue);
      return;
    }

    // Do not allow a connected user to add themselves to the matching queue again. (security)
    if (socket.user.currentGameIdPlaying) {
      socket.emit(':error', GameExceptions.currentlyInGame);
      return;
    }

    // Add the player to the match queue.
    Players.addToMatchQueue(socket.user);

    Players.playerEmitter.on('gameReady', function (game) {
      // If the player is not a player in this game, don't send them anything.
      if (!game.players.includes(socket.user.playerId)) {
        return;
      }

      const playersUsernames = [];
      // console.log('game players', game.players);
      game.players.forEach(playerId => {
        playersUsernames.push(Players.findActiveUserById(playerId).username);
      });
      const payload = {
        gameId: game.gameId,
        players: playersUsernames,
      };
      //console.log('players on match found', payload);
      //console.log('socket.user.userId =', socket.user);

      // try to emit the event only to the players who are searching for an opponent AND are in the game
      socket.emit("game:matchFound", payload);
    });
  };

  const fetchCurrentStateOfGame = (gameId) => {
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
      ammoInventories: socket.user.ammoInventory.toJSON(),
      lives: socket.user.life.toJSON(),
      moveHistory: thisPlayerMoveHistory,
    };

    // Construct my opponent's information (their ammo, their lives, their move history)
    const playerOpponent = {
      username: otherPlayer.username,
      ammoInventories: otherPlayer.ammoInventory.toJSON(),
      lives: otherPlayer.life.toJSON(),
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

    console.log("fetch payload: ", payload);

    // Send me my payload.
    socket.emit("game:fetch:result", payload);
  }

  const roundSubmitMove = (payload) => {
    /*
      payload: {
        gameId: <string>
        move: {
          head: 'none' / 'attack' / 'block',
          body: 'none' / 'attack' / 'block',
          legs: 'none' / 'attack' / 'block',
        }
      }
    */
    const {gameId, move} = payload;

    // Find the game by gameId
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

    let thisPlayer = socket.user;

    // Get the current Round
    let currentRound = foundGame.getCurrentRound();

    // Verify that the Round is finished or not. TODO: figure this out.
    // if (currentRound.isRoundFinished()) {
    //   socket.emit(':error', GameExceptions.roundFinishedAlready);
    //   return;
    // }

    // Get opponent's playerId
    const otherPlayerId = Object.values(playersIds)
      .find(_playerId => _playerId !== socket.user.playerId);

    // Find opponent's player object.
    let otherPlayer = Players.findActiveUserById(otherPlayerId);

    // Update the round moves for the current round.
    foundGame.updateRoundMoves(move, thisPlayer);

    // Get this player's moves
    let thisPlayerMove = currentRound.moves[thisPlayer.playerId];

    // Inventory Ammo accounting
    console.log('this player move to account: ', thisPlayerMove);
    // Decrease the inventory ammo if applicable.
    Object.values(thisPlayerMove).forEach(bodyPartMove => {
      if (bodyPartMove === 'attack') {
        thisPlayer.ammoInventory.attackDecrease();
      } else if (bodyPartMove === 'block') {
        thisPlayer.ammoInventory.blockDecrease();
      }
    });
    console.log('this player inventory', JSON.stringify(thisPlayer.ammoInventory)); // debug

    // If both players' moves have not been received yet, don't continue.
    if (!currentRound.movesCompleted()) {
      currentRound.timeoutObject = setTimeout(() => {
        // Make an empty move for the other player. (Consider the other player's move as an empty move).
        let otherPlayerMove = Object.create(Move);

        // Life accounting and Round evaluation
        lifeAccountingAndRoundEvaluation(currentRound, otherPlayerId, thisPlayerMove, thisPlayer, otherPlayerMove, otherPlayer, foundGame);

        preparePayloadAndEmit(io, foundGame, otherPlayerMove, thisPlayerMove, thisPlayer, otherPlayer);
      }, currentRound.getTimeLeftTilRoundFinishes() + 5000);
      return;
    }

    // Clear the timeout, because the opponent has submitted their move it seems.
    currentRound.clearMoveTimout();

    // Get the other player's moves
    let otherPlayerMove = currentRound.moves[otherPlayerId];

    // Life accounting and Round evaluation
    lifeAccountingAndRoundEvaluation(currentRound, otherPlayerId, thisPlayerMove, thisPlayer, otherPlayerMove, otherPlayer, foundGame);

    preparePayloadAndEmit(io, foundGame, otherPlayerMove, thisPlayerMove, thisPlayer, otherPlayer);

    if (foundGame.gameComplete) {
      foundGame.end();
      thisPlayer.cleanUpAfterGame();
      otherPlayer.cleanUpAfterGame();
    }
  };

  const playerIsReady = (gameId) => {
    // Find the game by gameId
    console.log("PLAYER IS READY", gameId)
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

  socket.on("game:iamready", playerIsReady);
  socket.on("game:searchForOpponent", searchForOpponent);
  socket.on("game:fetch", fetchCurrentStateOfGame);
  socket.on("game:round:submitMove", roundSubmitMove);
};
