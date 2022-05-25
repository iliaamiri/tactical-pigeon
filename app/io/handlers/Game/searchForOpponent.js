// Repos
const Games = require("../../../repos/Games");
const {Players} = include("app/repos/Players");

// Exceptions
const GameExceptions = include("core/Exceptions/GameExceptions");

/**
 * Callback function for `game:searchForOpponent` event. This will add the player who wants to play, to the matching queue.
 * If there were more than or equal to 2 players in the queue, an event will be emitted and matches two players.
 */
module.exports = (io, socket) => {
  return () => {
    // Do not allow a player who is already in the match to be added to the queue.
    if (Players.isInMatchQueue(socket.user.playerId)) {
      socket.emit(':error', GameExceptions.playerAlreadyInMatchQueue);
      return;
    }

    // If the user is already in a match and they want to find a match, they will receive a "Match Found" along with
    // the gameId they are currently in.
    if (socket.user.currentGameIdPlaying) {
      const game = Games.find(socket.user.currentGameIdPlaying);
      if (!game.gameComplete) {
        const playersUsernames = [];
        game.players.forEach(playerId => {
          playersUsernames.push(Players.findActiveUserById(playerId).username);
        });
        const payload = {
          gameId: game.gameId,
          players: playersUsernames,
        };

        // try to emit the event only to the players who are searching for an opponent AND are in the game
        socket.emit("game:matchFound", payload);
       // socket.emit(':error', GameExceptions.currentlyInGame);
        return;
      }

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
};