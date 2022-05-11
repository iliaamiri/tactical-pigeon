const Game = require("../../models/Game");
const Games = require("../../repos/Games");

const Players = require("../../repos/Players").Players;
const Game = require("../../repos/Games").Games;

module.exports = (io, socket) => {
    // socket.user : ref to Player : authenticated player.

    const searchForOpponent = () => {
        Players.addToMatchQueue(player);
    };

    const fetchCurrentStateOfGame = (gameId) => {
        const players = Games.find(gameId).players;

        const thisPlayer = Object.values(players)
            .filter(player => player.playerId === socket.user.userId);
        const game = Games.find(gameId);
        let thisPlayerMoveHistory = []; 
        game.rounds.forEach(round => {
            thisPlayerMoveHistory.push(round.moves[thisPlayer.userId]);
        });

        const playerMe = {
            ammoInventories: thisPlayer.ammoInventory,
            lives: thisPlayer.life,
            moveHistory: thisPlayerMoveHistory,
        };

        const otherPlayer = Object.values(players)
            .filter(player => player.playerId !== socket.user.userId);
        game.rounds.forEach(round => {
            thisPlayerMoveHistory.push(round.moves[otherPlayer.userId]);
        });

        const playerOpponent = {
            ammoInventories: otherPlayer.ammoInventory,
            lives: otherPlayer.life,
            moveHistory: otherPlayerMoveHistory,
        };

        const payload = {
            playerMe,
            playerOpponent,
            gameStatus: game.gameStatus,
        };
        socket.emit("game:fetch:result", payload);
    }

    const roundSubmitMove = (payload) => { // moves: ref to Move
        const gameId = payload.gameId;
        const move = payload.move;

        Games.updateRoundMoves(gameId, move);
    };

    Players.playerEmitter.on('gameReady', function(game) {
        const otherUser = Object.values(game.players)
            .filter(player => player.playerId !== socket.user.userId);
        const payload = {
            gameId: game.gameId,
            player2_username: otherUser,
        };
        // eventually will emmit an socket event to frontend which includes a payload:
        socket.emit("game:matchFound", payload);
    });

    Games.gameEmitter.on('roundMovesComplete', function(moves, gameComplete) {
        const opponentMoves = Object.values(moves)
            .filter(move => move.playerId !== socket.user.userId);
        gameComplete = 
        socket.emit("game:round:opponentMove", {
            opponentMove: opponentMoves,
            gameComplete: gameComplete,
        });
    });

    socket.on("game:searchForOpponent", searchForOpponent);
    socket.on("game:fetch", fetchCurrentStateOfGame);
    socket.on("game:round:submitMove", roundSubmitMove);
};

