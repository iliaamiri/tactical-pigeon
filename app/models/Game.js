const Round = require("./Round");
const {makeId} = require("../../core/utils");

const Game = {
  rowId: null, // int (db primary key auto incrmn)
  gameId: null, // string
  winnerPlayerId: null, // int (ref to Player)

  players: [], // items: players' IDs

  rounds: [
    // $ref: Round
  ],

  initNewGame(playersArr) {
    this.gameId = makeId();
    this.nextRound();
    this.players = [];

    // Add the players' IDs to the game instance.
    playersArr.map(player => {
      this.players.push(player.playerId);

      // Initiate the players for a new game (prepare them for a new game).
      player.initForNewGame(this);
    });
  },

  nextRound: function () {
    const newRound = Object.create(Round);
    newRound.roundNumber = this.getCurrentRound() + 1;
    this.rounds.push(newRound);
  },

  /**
   * Calculates the current round number based on the number of rounds there are in the round array property.
   * @returns {number}
   */
  getCurrentRound() {
    return this.rounds.length;
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