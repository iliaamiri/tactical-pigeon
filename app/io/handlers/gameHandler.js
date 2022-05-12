const Game = require("../../models/Game");
const Games = require("../../repos/Games");

const Players = require("../../repos/Players").Players;

module.exports = (io, socket) => {
    // socket.user : ref to Player : authenticated player.

    const searchForOpponent = (player) => {
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

    const roundSubmitMove = (payload) => {
        /* 
            payload: {
                gameId: <string>
                playerId: <string>
                move: {
                    head: 'none' / 'attack' / 'block',
                    body: 'none' / 'attack' / 'block',
                    legs: 'none' / 'attack' / 'block',
                }
            }
        */

        Games.updateRoundMoves(payload, Players);
    };

    Players.playerEmitter.on('gameReady', function(game) {
        Games.add(game);
        // console.log('Games.all', Games.showAll());
        const players = [];
        game.players.forEach(playerId => {
            players.push(Players.all[playerId].username);
        });
        const payload = {
            gameId: game.gameId,
            players: players,
        };
        // console.log('players on match found', payload)
        socket.emit("game:matchFound", payload);
    });

    Games.gameEmitter.on('roundMovesComplete', function(moves, gameComplete) {
        // console.log('moves received', moves);
        // console.log('socket.user.userId =', socket.user.userId);
        let movesWithoutUserId = {};
        let gameId;
        Object.values(moves).forEach(userMoveSet => {
            // console.log('userMoveSet', userMoveSet);
            let userId = userMoveSet.userId;
            gameId = userMoveSet.gameId;
            //let playerIds = Games.find(gameId).players;
            let userName = Players.find(userId).username;
            // console.log('userName', userName);
            movesWithoutUserId[userName] = userMoveSet.move;
            delete userMoveSet.userId;
            delete userMoveSet.gameId;
        });
        // console.log('movesWithoutUserId:', movesWithoutUserId);

        /* 
            movesWithoutUserId {
                username1 {
                    head,
                    body,
                    legs,
                },
                username2 {
                    head,
                    body,
                    legs,
                }
            }
        */
        socket.emit("game:round:opponentMove", {
            gameId: gameId,
            moves: movesWithoutUserId,
            gameComplete: gameComplete,
        });
    });

    socket.on("game:searchForOpponent", searchForOpponent);
    socket.on("game:fetch", fetchCurrentStateOfGame);
    socket.on("game:round:submitMove", roundSubmitMove);
};

