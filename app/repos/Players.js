const EventEmitter = require('events');
const playerEmitter = new EventEmitter();

const makeId = require('../../core/utils').makeId;

const Games = require("./Games");
const Game = require("../models/Game");
const Inventory = require("../models/AmmoInventory");

/* playerEmitter.on('addPlayer', function(player) {
  //console.log('adding player', player);
  Players.addToMatchQueue(player);
}); */

playerEmitter.on('matchReady', function(playersArr) {
  //console.log('two players are ready to be matched:', playersArr);

  const game = Object.create(Game);
  game.gameId = makeId();
  Games.all[gameId] = game;
  playersArr.forEach(player => {
    game.players[player.playerId] = player;
    game.inventories[player.playerId] = Object.create(Inventory);
    game.inventories[player.playerId].gameId = gameId;
    game.inventories[player.playerId].playerId = player.playerId;
  });

  // at the end, empty the match queue
  Players.matchQueue = [];
  
  playerEmitter.emit('gameReady', game);
});

const Players = {
    playerEmitter: playerEmitter,
    all: { 
      //  "<playerId":  $ref Player
    },

    matchQueue: [],

    addToMatchQueue: function(player) {
      //console.log('adding player to match queue', player);
      this.matchQueue.push(player);
      //console.log('match queue length', this.matchQueue.length);
      if (this.matchQueue.length === 2) {
        playerEmitter.emit('matchReady', this.matchQueue);
      }
    },

    matchPlayers: function() {

    },

    // all the CRUD methods (delete, save, findById)
    add: function(player) {
      this.all[player.playerId] = player;
      // playerEmitter.emit('addPlayer', player);
    },

    delete: function(id) {
      delete this.all[id];
    },

    find: function(id) {
      return this.all[id] || null;
    },
};

module.exports = { Players, playerEmitter };
