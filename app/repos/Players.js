const EventEmitter = require('events');
const playerEmitter = new EventEmitter();

const makeId = require('../../core/utils').makeId;
//const Games = require("./Games");
const Game = require("../models/Game");
const AmmoInventory = require("../models/AmmoInventory");
//const Round = require('../models/Round');
const Life = require('../models/Life');

/* playerEmitter.on('addPlayer', function(player) {
  //console.log('adding player', player);
  Players.addToMatchQueue(player);
}); */

playerEmitter.on('matchReady', function(playersArr) {
  // console.log('two players are ready to be matched:', playersArr);
  const game = Object.create(Game);
  game.gameId = makeId();
  // console.log('game newly created', JSON.parse(JSON.stringify(game)));
  //Games.add(game);
  //console.log('Games.all', Games.showAll());
  game.nextRound(game.currentRound);
  playersArr.forEach(player => {
    player.ammoInventory = Object.create(AmmoInventory);
    player.life = Object.create(Life);
    game.players.push([player.playerId]);
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
        // console.log('match queue', this.matchQueue);
        playerEmitter.emit('matchReady', this.matchQueue);
      }
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
