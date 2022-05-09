const Round = {
    rowId, // int (db primary key auto increment)
    roundId, // string

    maxTimer, // int (in seconds)

    gameId, // string (ref to Game obj)

    winnerPlayerId, // id (ref to Player obj)
 
    roundNumber, // int e.g. 1, 2, .., 5

    moves: {
        // <player1Id>: $ref: Move,
        // <player2Id>: $ref: Move
    },
};

module.exports = Round;