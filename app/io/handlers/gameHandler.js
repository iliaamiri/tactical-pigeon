// Exceptions
const GameExceptions = require("../../../core/Exceptions/GameExceptions");

// Repos
const Games = require("../../repos/Games");
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
      throw GameExceptions.currentlyInGame.errMessage;
    }

    // Add the player to the match queue.
    Players.addToMatchQueue(socket.user);
  };

  const fetchCurrentStateOfGame = (gameId) => {
    // Check if any game with this `gameId` exists or not.
    const game = Games.find(gameId);
    if (!game) {
      throw GameExceptions.gameNotFound.errMessage;
    }

    // Get players of the found game.
    const players = game.players;

    // Find this player who requested a game fetch and verify if they are in this game or not.
    const thisPlayer = Object.values(players)
      .filter(player => player.playerId === socket.user.playerId);
    if (!thisPlayer) {
      // For security, don't tell the noisy people if the game even exists or not.
      throw GameExceptions.gameNotFound.errMessage;
    }

    // Get my move history of the game.
    let thisPlayerMoveHistory = [];
    game.rounds.forEach(round => {
      thisPlayerMoveHistory.push(round.moves[thisPlayer.playerId]);
    });

    // Construct my information (my ammo, my lives, my move history).
    const playerMe = {
      ammoInventories: thisPlayer.ammoInventory,
      lives: thisPlayer.life,
      moveHistory: thisPlayerMoveHistory,
    };

    // Get my opponent's move history of the game.
    let otherPlayerMoveHistory = [];
    const otherPlayer = Object.values(players)
      .filter(player => player.playerId !== socket.user.playerId);
    game.rounds.forEach(round => {
      otherPlayerMoveHistory.push(round.moves[otherPlayer.playerId]);
    });

    // Construct my opponent's information (their ammo, their lives, their move history)
    const playerOpponent = {
      ammoInventories: otherPlayer.ammoInventory,
      lives: otherPlayer.life,
      moveHistory: otherPlayerMoveHistory,
    };

    // Prepare the payload for me.
    const payload = {
      playerMe,
      playerOpponent,
      gameStatus: game.gameStatus,
    };

    // Send me my payload.
    socket.emit("game:fetch:result", payload);
  }

  const roundSubmitMove = (payload) => {
    /* 
      payload: {
        gameId: <string>
        playerId: <string>
        move: {
          head: 'none' / 'attack' / 'block',
          body: 'none' / 'attack' / 'block',
          legs: 'none' / 'attack' / 'block',
        }
      }
    */

    Games.updateRoundMoves(payload, Players);
  };

  Players.playerEmitter.on('gameReady', function (game) {
    Games.add(game);
    //console.log('Games.all', Games.showAll());
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
    
    // try to emit the event only to the players who are in the game
    if (game.players.includes(socket.user.playerId)) {
      socket.emit("game:matchFound", payload);
    }
    
  });

  Games.gameEmitter.on('roundMovesComplete', function (moves, gameComplete) {
    // console.log('moves received', moves);
    // console.log('socket.user.userId =', socket.user.userId);
    let movesWithoutUserId = {};
    let gameId;
    Object.values(moves).forEach(userMoveSet => {
      // console.log('userMoveSet', userMoveSet);
      let userId = userMoveSet.userId;
      gameId = userMoveSet.gameId;
      //let playerIds = Games.find(gameId).players;
      let userName = Players.find(userId).username;
      // console.log('userName', userName);
      movesWithoutUserId[userName] = userMoveSet.move;
      delete userMoveSet.userId;
      delete userMoveSet.gameId;
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
      gameId: gameId,
      moves: movesWithoutUserId,
      gameComplete: gameComplete,
    });
  });

  socket.on("game:searchForOpponent", searchForOpponent);
  socket.on("game:fetch", fetchCurrentStateOfGame);
  socket.on("game:round:submitMove", roundSubmitMove);
};
