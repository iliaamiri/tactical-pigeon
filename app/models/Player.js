const {makeId} = require("../../core/utils");
const AmmoInventory = require("./AmmoInventory");
const Life = require("./Life");

const Player = {
  playerId: null, // int (db primary key auto increment)
  username: null, // string
  ammoInventory: null, //$ref: AmmoInventory

  socketId: null, // socket.io Id. Changes for each socket connection.

  life: null, // $ref: Life

  initNewPlayer(username) {
    let newPlayerId = makeId();
    this.initOnlinePlayer(newPlayerId, username);
  },

  initOnlinePlayer(playerId, username) {
    this.playerId = playerId;
    this.username = username;
    this.ammoInventory = Object.create(AmmoInventory);
    this.life = Object.create(Life);
  },

  toJSON: function () {
    return {
      playerId: this.playerId,
      username: this.username,
      ammoInventory: this.ammoInventory,
      life: this.life,
    };
  },
};

module.exports = Player;