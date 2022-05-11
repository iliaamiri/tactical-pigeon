const EventEmitter = require('events');
const gameEmitter = new EventEmitter();

const Games = {
  gameEmitter: gameEmitter,
  all: {},

  updateRoundMoves: function(gameId, move) {
    const game = this.find(gameId);
    const round = game.rounds[game.currentRound - 1];
    round.moves[move.userId] = move;

    // when both players' moves have been received
    if (Object.keys(round.moves).length === 2) {
      // inventory and life accounting
      Object.values(game.inventories).forEach(inventory => {
        Object.keys(round.moves).forEach(playerId => {
          let moveSet = round.moves[playerId];
          Object.values(moveSet).forEach(bodyPartMove => {
            if (bodyPartMove === 'attack') {
              inventory.attackDecrease();
            } else if (bodyPartMove === 'block') {
              inventory.blockDecrease();
            }
          }); 
        }); 

        if (inventory.getTotalInventory() === 0) {
          game.gameComplete = true;
        }
      });
    
      if (game.currentRound === 5) {
        game.gameComplete = true;
      }
      this.gameEmitter.emit('roundMovesComplete', round.moves, gameComplete);

      if (game.gameComplete) {
        delete this.all[gameId];
      }
    }

  },

  // all the CRUD methods (delete, save, findById)
  add: function(game) {
    this.all[game.gameId] = game;
  },

  delete: function(id) {
    delete this.all[id];
  },

  find: function(id) {
    return this.all[id];
  },
};

module.exports = Games;
