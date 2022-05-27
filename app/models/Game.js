const Round = require("./Round");
const {makeId} = require("../../core/utils");

const database = require("../../databaseAccessLayer");

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

  isPlayerReady(playerId) {
    return this.playersReadyStatus[playerId];
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

  end(player1, player2, winnerPlayer = null) {
    this.gameComplete = true;
    this.endedAt = Date.now();

    if (!player1 || !player2) {
      console.log(
        new Error("While winnerPlayer was passed, the loserPlayer was not passed to Game.end method. make sure to pass both"),
        "Player1: ", player1,
        "Player2: ", player2); // debug
      return;
    }

    console.log("Player1 set : ", player1);
    console.log("Player2 set : ", player2);
    console.log("winnerPlayer? : ", winnerPlayer);

    if (player1.gamesPlayed || player1.gamesPlayed === 0) {
      player1.gamesPlayed += 1;
    }

    if (player2.gamesPlayed || player2.gamesPlayed === 0) {
      player2.gamesPlayed += 1;
    }

    if (winnerPlayer) { // If there was a winner
      this.winnerPlayerId = winnerPlayer.playerId;
      const loserPlayer = (player1.playerId === winnerPlayer.playerId) ? player2 : player1;

      if (winnerPlayer.isTracked()) {
        if (winnerPlayer.gamesWon || winnerPlayer.gamesWon === 0) {
          winnerPlayer.gamesWon += 1;
        }
        database.playerEntity.incrementGameStatsById(winnerPlayer.playerId, "won")
          .catch(err => console.debug(new Error(err)));
      }
      if (loserPlayer.isTracked()) {
        if (loserPlayer.gamesLost || winnerPlayer.gamesLost === 0) {
          loserPlayer.gamesLost += 1;
        }
        database.playerEntity.incrementGameStatsById(loserPlayer.playerId, "lost")
          .catch(err => console.debug(new Error(err)));
      }
    } else { // DRAW
      if (player1.isTracked()) {
        database.playerEntity.incrementGameStatsById(player1.playerId)
          .catch(err => console.debug(new Error(err)));
      }
      if (player2.isTracked()) {
        database.playerEntity.incrementGameStatsById(player2.playerId)
          .catch(err => console.debug(new Error(err)));
      }
    }
  },

  /**
   * Returns the playerId of the winner. returns null if there were no winner.
   * @param thisPlayer
   * @param otherPlayer
   * @returns {null|*|null}
   */
  calculateGameResults(thisPlayer, otherPlayer) {
    console.log('calculating game results...');
    if (thisPlayer.life.lives > otherPlayer.life.lives) {
      return thisPlayer.playerId;
    } else if (thisPlayer.life.lives < otherPlayer.life.lives) {
      return otherPlayer.playerId; // loss
    }

    // if there's a draw, one can win by inventory counts
    let leftPlayerTotalInventory = thisPlayer.ammoInventory.getTotalInventory();
    let rightPlayerTotalInventory = otherPlayer.ammoInventory.getTotalInventory();

    if (leftPlayerTotalInventory > rightPlayerTotalInventory) {
      return thisPlayer.playerId; // win
    } else if (leftPlayerTotalInventory < rightPlayerTotalInventory) {
      return otherPlayer.playerId; // loss
    }

    // if lives and inventories are exactly equal,
    return null; // draw
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