const Games = require('../repos/Games');
const Move = require("./Move");

const Round = {
  rowId: null, // int (db primary key auto increment)
  roundId: null, // string
  gameId: null, // string (ref to Game obj)
  winnerPlayerId: null, // id (ref to Player obj)

  maxTimer: 30, // int (in seconds)
  roundNumber: 1, // int e.g. 1, 2, .., 5

  moves: {
    // <player1Id>: $ref: Move,
    // <player2Id>: $ref: Move
  },

  initNew(roundNumber, gameId) {
    this.gameId = gameId;

    this.moves = {};
  },

  addPlayerMove(playerId, moves) {
    this.moves[playerId].updateMoves(moves);
  },

  movesCompleted() {
    return this.moves.length === 2;
  },

  toJSON: function () {
    return {
      rowId: this.rowId,
      roundId: this.roundId,
      maxTimer: this.maxTimer,
      gameId: this.gameId,
      winnerPlayerId: this.winnerPlayerId,
      roundNumber: this.roundNumber,
      moves: this.moves,
    };
  }
};

module.exports = Round;