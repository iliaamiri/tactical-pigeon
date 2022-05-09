const Game = {
    rowId, // int (db primary key auto incrmn)
    gameId, // string

    winnerPlayerId, // int (ref to Player)

    players: {
        player1Id, // Int, ref to Players
        player2Id // Int, ref to Players
    },

    rounds: [
        // $ref: Round
    ],

};

module.exports = Game;