const Games = {
  all: {},

  // all the CRUD methods (delete, save, findById)
  add: function(game) {
    this.all[game.gameId] = game;
  },

  delete: function(id) {
    delete this.all.id;
  },

  find: function(id) {
    return this.all.id
  },
};
