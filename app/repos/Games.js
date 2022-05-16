const EventEmitter = require('events');
const gameEmitter = new EventEmitter();

const Games = {
  gameEmitter: gameEmitter,
  all: {},

  // all the CRUD methods (delete, save, findById)
  add: function (game) {
    this.all[game.gameId] = game;
  },

  delete: function (id) {
    delete this.all[id];
  },

  find: function (id) {
    return this.all[id] || null;
  },

  showAll: function () {
    return this.all;
  }
};

module.exports = Games;
