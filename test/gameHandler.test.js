const gameHandler = require('../app/io/handlers/gameHandler');
const EventEmitter = require('events');
const testEmitter = new EventEmitter();
const Player = require('../app/models/Player');
const makeId = require('../core/utils').makeId;
const Players = require("../app/repos/Players").Players;

const handler = gameHandler(null, testEmitter);

testEmitter.on("game:round:opponentMove", async function(payload) {
  console.log('moves sent to client', payload);
});

testEmitter.on("game:matchFound", async function(payload) {
  // console.log('matchFound', payload);

  let movePayload = JSON.parse(JSON.stringify({
    gameId: payload.gameId,
    userId: player1.playerId,
    move: {
      head: 'block',
      body: 'attack',
      legs: 'none',
    }
  }));
  // console.log('move payload 1', JSON.parse(JSON.stringify(movePayload)));
  testEmitter.user = player1;
  testEmitter.emit("game:round:submitMove", movePayload);

  movePayload = JSON.parse(JSON.stringify({
    gameId: payload.gameId,
    userId: player2.playerId,
    move: {
      head: 'block',
      body: 'none',
      legs: 'block',
    }
  }));
  testEmitter.user = player2;
  testEmitter.emit("game:round:submitMove", movePayload);
});

let player1 = Object.create(Player);
player1.playerId = makeId();
player1.username = 'Alice';
Players.add(player1);
testEmitter.user = player1;
testEmitter.emit("game:searchForOpponent", player1);

let player2 = Object.create(Player);
player2.playerId = makeId();
player2.username = 'Bob';
Players.add(player2);
testEmitter.user = player2;
testEmitter.emit("game:searchForOpponent", player2);


