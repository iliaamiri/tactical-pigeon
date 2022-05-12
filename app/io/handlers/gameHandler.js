module.exports = (io, socket) => {
    // socket.user : ref to Player : authenticated player.

    const searchForOpponent = () => {


        // eventually will emmit an socket event to frontend which includes a payload:
        socket.emit("game:matchFound", 
        // {
        //     gameId: "<gameId>",
        //     player2_username: username
        // }
        );
    }

    const fetchCurrentStateOfGame = (gameId) => {
        

        socket.emit("game:fetch:result", 
        // result payload:
        // {
        //     player_me: {
        //         ammoInventories: "ref to AmmoInventory",
        //         lives: "ref to Lives",
        //         moveHistory: [
        //             // $item: $ref to Move
        //         ],
        //     },
        //     player_opponent: {
        //         ammoInventories: "ref to AmmoInventory",
        //         lives: "ref to Lives",
        //         moveHistory: [
        //             // $item: $ref to Move
        //         ],
        //     },
        //     gameStatus: "lost", "won", "draw", null
        // }
        );
    }

    const roundSubmitMove = (moves) => { // moves: ref to Move


        socket.emit("game:round:opponentMove", {
         //   opponentMoves: "$ref to Move"
        });
    }

    socket.on("game:searchForOpponent", searchForOpponent);
    socket.on("game:fetch", fetchCurrentStateOfGame);
    socket.on("game:round:submitMove", roundSubmitMove);
}