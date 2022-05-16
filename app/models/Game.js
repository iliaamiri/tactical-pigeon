const Round = require("./Round");
const {makeId} = require("../../core/utils");
const singleCompare = require("../io/helpers/singleCompare");
const tripleCompare = require("../io/helpers/tripleCompare");
// const {Players} = require("../repos/Players");

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
    this.rounds = [];
    this.nextRound();
    this.players = [];

    // Add the players' IDs to the game instance.
    playersArr.map(player => {
      this.players.push(player.playerId);

      // Initiate the players for a new game (prepare them for a new game).
      player.initForNewGame(this);
    });
  },

  updateRoundMoves(moves, player) {
    // Get the current round.
    const currentRound = this.getCurrentRound();

    // Update the moves of the player.
    currentRound.addPlayerMove(player.playerId, moves);
  },

  /**
   * Makes a new round as the next ongoing round and pushes it to the rounds array.
   */
  nextRound() {
    const newRound = Object.create(Round);
    newRound.initNew(this.getCurrentRoundNumber() + 1, this.gameId);
    this.rounds.push(newRound);
  },

  /**
   * Calculates the current round number based on the number of rounds there are in the round array property.
   * @returns {number}
   */
  getCurrentRoundNumber() {
    return this.rounds.length;
  },

  /**
   * Gets the current round is going. if there are no rounds, it will return null. Otherwise, it will return an instance
   * of the Round model.
   * @returns {null|*}
   */
  getCurrentRound() {
    if (this.getCurrentRoundNumber() < 1) {
      return null;
    }

    return this.rounds[this.getCurrentRoundNumber() - 1];
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