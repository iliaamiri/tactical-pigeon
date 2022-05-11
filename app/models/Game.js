const Round = require("./Round");

const Game = {
    rowId: null, // int (db primary key auto incrmn)
    gameId: null, // string
    winnerPlayerId: null, // int (ref to Player)
    gameComplete: false,
    players: {
        // Int, ref to Players
    },
    currentRound: 1,
    rounds: [
        // $ref: Round
    ],
    inventories: {
        // ref to AmmoInventory
    },
    /* nextRound: function(roundData) {
        this.rounds.push(roundData);
    }, */

    toJSON: function() {
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