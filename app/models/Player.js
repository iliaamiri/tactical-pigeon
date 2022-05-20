const {makeId, makeGuestId} = require("../../core/utils");
const AmmoInventory = require("./AmmoInventory");
const Life = require("./Life");
const {Players} = require("../repos/Players");

const Player = {
  playerId: null, // int (db primary key auto increment)
  username: null, // string
  ammoInventory: null, //$ref: AmmoInventory

  socketId: null, // socket.io Id. Changes for each socket connection.

  disconnectDetectionSetTimoutId: null,

  currentGameIdPlaying: null, // current gameId where user is playing in.

  life: null, // $ref: Life

  initNewGuestPlayer() {
    let newGuestId = makeGuestId();
    this.username = newGuestId;
    this.initOnlinePlayer(newGuestId, newGuestId);
  },

  initNewPlayer(username) {
    let newPlayerId = makeId();
    this.initOnlinePlayer(newPlayerId, username);
  },

  initOnlinePlayer(playerId, username) {
    this.playerId = playerId;
    this.username = username;
  },

  initForNewGame(game) {
    // Allocate both players their ongoing game id to make sure they won't play another game simultaneously.
    this.currentGameIdPlaying = game.gameId;

    // Initiate the players' initial ammo and lives.
    this.ammoInventory = Object.create(AmmoInventory);
    this.ammoInventory.init(game.gameId, this.playerId);

    this.life = Object.create(Life);
    this.life.init(game.gameId, this.playerId);
  },

  reSyncInRepo() {
    Players.updateActivePlayer(this.playerId, this);
  },

  reSyncInDatabase() {
    Players.updateInDatabase(this.playerId, this);
  },

  isOnline() {
    return !!(this.socketId);
  },

  cleanUpAfterGame() {
    this.currentGameIdPlaying = null;
    this.life = null;
    this.ammoInventory = null;
  },

  toJSON() {
    return {
      playerId: this.playerId,
      username: this.username,
      ammoInventory: this.ammoInventory,
      life: this.life,
    };
  },
};

module.exports = Player;