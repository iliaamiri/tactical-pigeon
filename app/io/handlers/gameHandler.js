// Exceptions
const GameExceptions = require("../../../core/Exceptions/GameExceptions");

// Repos
const Games = require("../../repos/Games");
const singleCompare = require("../helpers/singleCompare");
const tripleCompare = require("../helpers/tripleCompare");
const Players = require("../../repos/Players").Players;

module.exports = async (io, socket) => {
  // socket.user : ref to Player : authenticated player.

  /**
   * Callback function for `game:searchForOpponent` event. This will add the player who wants to play, to the matching queue.
   * If there were more than or equal to 2 players in the queue, an event will be emitted and matches two players.
   */
  const searchForOpponent = () => {
    // Do not allow a connected user to add themselves to the matching queue again. (security)
    if (socket.user.currentGameIdPlaying) {
      socket.emit(':error', GameExceptions.currentlyInGame.userErrorMessage);
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
        playersUsernames.push(Players.all[playerId].username);
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
      socket.emit(':error', GameExceptions.gameNotFound.userErrorMessage);
      return;
    }

    // Get players of the found game.
    const players = game.players;

    // Find this player who requested a game fetch and verify if they are in this game or not.
    const thisPlayerId = Object.values(players)
      .filter(_playerId => _playerId === socket.user.playerId);
    if (!thisPlayerId) {
      // For security, don't tell the noisy people if the game even exists or not.
      socket.emit(':error', GameExceptions.gameNotFound.userErrorMessage);
      return;
    }

    // Get opponent's playerId
    const otherPlayerId = Object.values(players)
      .filter(_playerId => _playerId !== socket.user.playerId);

    // Find opponent's player object.
    let otherPlayer = Players.find(otherPlayerId);

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

    // Prepare the payload for me.
    const payload = {
      playerMe,
      playerOpponent,
      gameComplete: game.gameComplete,
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
      socket.emit(':error', GameExceptions.gameNotFound.userErrorMessage);
      return;
    }

    // Get players of the found game.
    const playersIds = foundGame.players;

    // Find this player who requested a game fetch and verify if they are in this game or not.
    const thisPlayerId = Object.values(playersIds)
      .filter(_playerId => _playerId === socket.user.playerId);
    if (!thisPlayerId) {
      // For security, don't tell the noisy people if the game even exists or not.
      socket.emit(':error', GameExceptions.gameNotFound.userErrorMessage);
      return;
    }

    let thisPlayer = socket.user;

    // Get the current Round
    let currentRound = foundGame.getCurrentRound();

    // Verify that the Round is finished or not.
    if (currentRound.isRoundFinished()) {
      socket.emit(':error', GameExceptions.roundFinishedAlready.userErrorMessage);
      return;
    }

    // Get opponent's playerId
    const otherPlayerId = Object.values(playersIds)
      .filter(_playerId => _playerId !== socket.user.playerId);

    // Find opponent's player object.
    let otherPlayer = Players.find(otherPlayerId);

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
      return;
    }

    // Life accounting
    console.log('this players life', JSON.parse(JSON.stringify(thisPlayer.life))); // debug

    // Get the other player's moves
    let otherPlayerMove = currentRound.moves[otherPlayerId];

    console.log('otherPlayerMove', otherPlayerMove); // debug

    let checkedMovesArr = [];
    for (const key of Object.keys(thisPlayerMove.toJSON())) {
      checkedMovesArr.push(singleCompare(thisPlayerMove[key], otherPlayerMove[key]));
    }
    let roundResult = tripleCompare(checkedMovesArr);
    if (roundResult === 2) {
      thisPlayer.life.loseLife();
    }
    if (roundResult === 1) {
      otherPlayer.life.loseLife();
    }

    console.log('this players life after processing', JSON.parse(JSON.stringify(thisPlayer.life)));

    if (thisPlayer.ammoInventory.getTotalInventory() === 0 // If the player had no ammo
      || otherPlayer.ammoInventory.getTotalInventory() === 0 // If the other player had no ammo
      || thisPlayer.life.lives === 0 // If this player had no lives
      || otherPlayer.life.lives === 0 // If the other player had not lives
      || currentRound === 5) // Or, if this was the last round
    {
      foundGame.gameComplete = true; // Mark the game as complete
    } else {
      foundGame.nextRound();
    }

    let thisPlayerPayload = {
      opponentMoves: otherPlayerMove.toJSON(),
      gameComplete: foundGame.gameComplete
    };
    let otherPlayerPayload = {
      opponentMoves: thisPlayerMove.toJSON(),
      gameComplete: foundGame.gameComplete
    };

    io.to(thisPlayer.socketId).emit("game:round:opponentMove", thisPlayerPayload);
    io.to(otherPlayer.socketId).emit("game:round:opponentMove", otherPlayerPayload);

    // if (foundGame.gameComplete) {
    //   Games.delete(gameId);
    // }
  };

  socket.on("game:searchForOpponent", searchForOpponent);
  socket.on("game:fetch", fetchCurrentStateOfGame);
  socket.on("game:round:submitMove", roundSubmitMove);
};
