const Round = require("./Round");

const Game = {
  rowId: null, // int (db primary key auto incrmn)
  gameId: null, // string
  winnerPlayerId: null, // int (ref to Player)

  players: {
    player1Id: null, // Int, ref to Players
    player2Id: null // Int, ref to Players
  },

  rounds: [
    // $ref: Round
  ],

  nextRound: function () {
    const newRound = Object.create(Round);
    newRound.roundNumber = this.rounds.length;
    this.rounds.push(newRound);
  },

  toJSON: function () {
    return {
      rowId: this.rowId,
      gameId: this.gameId,
      winnerPlayerId: this.winnerPlayerId,
      players: this.players,
      rounds: this.rounds,
    };
  },
};

module.exports = Game;