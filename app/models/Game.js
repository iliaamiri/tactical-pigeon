const Round = require("./Round");
const {makeId} = require("../../core/utils");

const Game = {
  rowId: null, // int (db primary key auto incrmn)
  gameId: null, // string
  winnerPlayerId: null, // int (ref to Player)

  players: [], // items: players' IDs

  gameComplete: false,

  rounds: [
    // $ref: Round
  ],

  playersReadyStatus: {
    // "<playerId>": boolean (true | false)
  },

  endedAt: null,

  initNewGame(playersArr) {
    this.gameId = makeId();
    this.rounds = [];
    this.playersReadyStatus = {};
    this.players = [];

    // Add the players' IDs to the game instance.
    playersArr.map(player => {
      this.players.push(player.playerId);
      this.playersReadyStatus[player.playerId] = false;

      // Initiate the players for a new game (prepare them for a new game).
      player.initForNewGame(this);
    });
  },

  areBothPlayersReady() {
    for (let status of Object.values(this.playersReadyStatus)) {
      if (!status) {
        return false;
      }
    }
    return true;
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
    if (this.getCurrentRoundNumber() >= 5) {
      this.gameComplete = true;
      return;
    }

    let currentRound = this.getCurrentRound();
    if (currentRound) {
      currentRound.clearMoveTimout();
    }

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

  end(winnerPlayerId = null) {
    this.gameComplete = true;
    this.endedAt = Date.now();

    if (winnerPlayerId) {
      this.winnerPlayerId = winnerPlayerId;
    }
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