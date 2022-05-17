const Games = require('../repos/Games');
const Move = require("./Move");

const Round = {
  rowId: null, // int (db primary key auto increment)
  roundId: null, // string
  gameId: null, // string (ref to Game obj)
  winnerPlayerId: null, // id (ref to Player obj)

  maxTimer: 30, // int (in seconds)
  roundNumber: 1, // int e.g. 1, 2, .., 5

  startedAt: null,

  moves: {
    // <player1Id>: $ref: Move,
    // <player2Id>: $ref: Move
  },

  /**
   * Initialize a new Round. This will be called when a new Round is going to start (or when nextRound method is called).
   * @param roundNumber
   * @param gameId
   */
  initNew(roundNumber, gameId) {
    this.gameId = gameId;

    this.startedAt = Date.now();

    this.moves = {};
  },

  /**
   * Add a player and their move to this Round. Runs when new move is submitted.
   * @param playerId
   * @param moves
   */
  addPlayerMove(playerId, moves) {
    this.moves[playerId] = Object.create(Move);
    this.moves[playerId].updateMoves(moves);
  },

  /**
   * Checks whether the moves of this round has been completed or not. In other words, checks if both players have submitted
   * their moves or not.
   * @returns {boolean}
   */
  movesCompleted() {
    return Object.values(this.moves).length === 2;
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