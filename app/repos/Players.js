const Players = {
    all: { 
      //  "<playerId":  $ref Player
    },

    // all the CRUD methods (delete, save, findById)
    add: function(player) {
      this.all[player.playerId] = player;
    },

    delete: function(id) {
      delete this.all.id;
    },

    find: function(id) {
      return this.all.id;
    },
};
