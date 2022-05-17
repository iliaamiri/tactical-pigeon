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

    // Get my move history of the game.
    let thisPlayerMoveHistory = [];
    game.rounds.forEach(round => {
      thisPlayerMoveHistory.push(round.moves[socket.user.playerId]);
    });

    // Construct my information (my ammo, my lives, my move history).
    const playerMe = {
      ammoInventories: socket.user.ammoInventory.toJSON(),
      lives: socket.user.life.toJSON(),
      moveHistory: thisPlayerMoveHistory,
    };

    // Get opponent's playerId
    const otherPlayerId = Object.values(players)
      .filter(_playerId => _playerId !== socket.user.playerId);

    // Find opponent's player object.
    let otherPlayer = Players.find(otherPlayerId);

    // Get my opponent's move history of the game.
    let otherPlayerMoveHistory = [];
    game.rounds.forEach(round => {
      otherPlayerMoveHistory.push(round.moves[otherPlayer.playerId]);
    });

    // Construct my opponent's information (their ammo, their lives, their move history)
    const playerOpponent = {
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
    const { gameId, move } = payload;

    const foundGame = Games.find(gameId);
    if (!foundGame) {
      socket.emit(':error', GameExceptions.gameNotFound.userErrorMessage);
      return;
    }

    foundGame.updateRoundMoves(move, socket.user);

    let currentRound = foundGame.getCurrentRound();

    // Inventory Ammo & Life accounting
    Object.values(foundGame.players).forEach(playerId => { // For each player.
      let player = Players.find(playerId);
      let playerMove = currentRound.moves[player.playerId];

      //console.log('player move to account', playerMove);

      // Decrease the inventory ammo if applicable.
      Object.values(playerMove).forEach(bodyPartMove => {
        if (bodyPartMove === 'attack') {
          player.ammoInventory.attackDecrease();
        } else if (bodyPartMove === 'block') {
          player.ammoInventory.blockDecrease();
        }
      });
      // console.log('inventory', JSON.stringify(inventory));

      // If the player had no ammo, then the game is over.
      if (player.ammoInventory.getTotalInventory() === 0) {
        this.gameComplete = true;
      }

      // Life accounting
      // console.log('this players life', JSON.parse(JSON.stringify(life)));
      let otherPlayerMove = Object.values(round.moves)
        .filter(moveSet => moveSet.playerId !== player.playerId)[0].move;
      //console.log('otherPlayerMove', otherPlayerMove);
      let checkedMovesArr = [];
      for (const key of Object.keys(playerMove)) {
        checkedMovesArr.push(singleCompare(playerMove[key], otherPlayerMove[key]));
      }
      let roundResult = tripleCompare(checkedMovesArr);
      if (roundResult === 2) {
        player.life.loseLife();
      }

      // console.log('this players life after processing', JSON.parse(JSON.stringify(life)));
    });

    if (currentRound === 5) {
      this.gameComplete = true;
    }

    // If both players' moves have not been received yet, don't continue.
    if (!currentRound.movesCompleted()) {
      return;
    }

    // console.log('moves received', moves);
    // console.log('socket.user.userId =', socket.user.userId);
    let movesWithoutUserId = {};

    Object.keys(currentRound.moves).forEach(playerId => {
      let userMoveSet = currentRound.moves[playerId];
      let userName = Players.find(playerId).username;
      // console.log('userName', userName);
      movesWithoutUserId[userName] = userMoveSet.move.toJSON();
    });
    // console.log('movesWithoutUserId:', movesWithoutUserId);

    /*
      movesWithoutUserId {
        username1 {
          head,
          body,
          legs,
        },
        username2 {
          head,
          body,
          legs,
        }
      }
    */
    socket.emit("game:round:opponentMove", {
      moves: movesWithoutUserId,
      gameComplete: foundGame.gameComplete,
    });

    foundGame.nextRound();
    if (foundGame.gameComplete) {
      this.delete(gameId);
    }
  };

  socket.on("game:searchForOpponent", searchForOpponent);
  socket.on("game:fetch", fetchCurrentStateOfGame);
  socket.on("game:round:submitMove", roundSubmitMove);
};
