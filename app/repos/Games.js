const EventEmitter = require('events');
const singleCompare = require('../io/helpers/singleCompare');
const tripleCompare = require('../io/helpers/tripleCompare');
const gameEmitter = new EventEmitter();
// const Players = require('../repos/Players');

const Games = {
  gameEmitter: gameEmitter,
  all: {},

  updateRoundMoves: function (movePayload, Players) {
    const game = this.find(movePayload.gameId);
    const round = game.rounds[game.currentRound - 1];
    round.moves[movePayload.userId] = movePayload;

    // when both players' moves have been received
    if (Object.keys(round.moves).length === 2) {
      // console.log('round moves', round.moves);

      // inventory accounting
      Object.values(game.players).forEach(playerId => {
        let player = Players.find(playerId);
        let inventory = player.ammoInventory;
        let playerMove = round.moves[player.playerId].move;
        //console.log('player move to acccount', playerMove);
        Object.values(playerMove).forEach(bodyPartMove => {
          if (bodyPartMove === 'attack') {
            inventory.attackDecrease();
          } else if (bodyPartMove === 'block') {
            inventory.blockDecrease();
          }
        });
        // console.log('inventory', JSON.stringify(inventory));

        if (inventory.getTotalInventory() === 0) {
          game.gameComplete = true;
        }

        // life accounting
        let life = player.life;
        // console.log('this players life', JSON.parse(JSON.stringify(life)));
        let otherPlayerMove = Object.values(round.moves)
          .filter(moveSet => moveSet.userId !== player.playerId)[0].move;
        //console.log('otherPlayerMove', otherPlayerMove);
        let checkedMovesArr = [];
        for (const key of Object.keys(playerMove)) {
          checkedMovesArr.push(singleCompare(playerMove[key], otherPlayerMove[key]));
        }
        let roundResult = tripleCompare(checkedMovesArr);
        if (roundResult === 2) {
          life.loseLife();
        }

        // console.log('this players life after processing', JSON.parse(JSON.stringify(life)));
      });

      if (game.currentRound === 5) {
        game.gameComplete = true;
      }

      //console.log('game state', JSON.parse(JSON.stringify(game)));
      this.gameEmitter.emit('roundMovesComplete', round.moves, game.gameComplete);
      game.nextRound();
      if (game.gameComplete) {
        delete this.all[gameId];
      }
    }
  },

  // all the CRUD methods (delete, save, findById)
  add: function (game) {
    this.all[game.gameId] = game;
  },

  delete: function (id) {
    delete this.all[id];
  },

  find: function (id) {
    return this.all[id];
  },

  showAll: function () {
    return this.all;
  }
};

module.exports = Games;
