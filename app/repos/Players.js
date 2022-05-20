const EventEmitter = require('events');
const playerEmitter = new EventEmitter();

const Games = require("./Games");
const Game = require("../models/Game");

// Mutex
const {Mutex} = require("async-mutex");

/**
 * Event listener <matchReady>: Receiving an array of two playerId's, this event will initiate a new game, and passes the
 * new game instance as a payload to the Event<gameReady>.
 *
 * This event will be emitted once the server realizes that there are more than two players in the queue.
 */
playerEmitter.on('matchReady', function (playersIdsArr) {
  // Get the player objects from playerIds.
  let playersArr = playersIdsArr.map(playerId => Players.findActiveUserById(playerId));

  console.log('two players are ready to be matched:', playersArr); // debug 🪲

  // Create new game instance and initiate it.
  const game = Object.create(Game);
  game.initNewGame(playersArr);

  console.log('game newly created and Initiated', JSON.parse(JSON.stringify(game)), "playersArr: ", playersArr);

  // Initiate the players' inventories and lives for a new game.
  playersArr.forEach(player => {
    // Initiate the players for a new game (prepare them for a new game).
    player.initForNewGame(game);
  });

  // Add the game instance to the Games collection.
  Games.add(game);

  console.log('Games.all', Games.showAll()); // debug

  // Signal `gameReady` Event and pass the game instance to the socket handler.
  playerEmitter.emit('gameReady', game);
});

const Players = {
  playerEmitter: playerEmitter, // playerEmitter Event

  // A Map collection of all the active users. The purpose of this property is to cache the active players the program
  // actively reads and writes. In short, this will help performance.
  allActiveUsers: new Map(), // <"<playerId", {$ref Player}>

  // An Array of all online players playerIds who are in the process of finding an opponent and a match. This array's
  // items will actively change, since once a match was found, the playerIds of the matched players will be removed from
  // this collection. And once the player starts searching, their playerId will be added to this collection.
  matchQueue: [],// The match queue array

  /**
   * Adds a player's PlayerId to the `matchQueue` Array collection. Race conditions are handled using Mutex.
   * Mutex NPM Documentation: https://www.npmjs.com/package/async-mutex
   * @param player
   */
  addToMatchQueue(player) {
    console.log('adding player to match queue', player);
    this.matchQueue.push(player.playerId);
    //console.log('match queue length', this.matchQueue.length); // debug
    const mutex = new Mutex();
    mutex
      .runExclusive(() => {
        if (this.matchQueue.length >= 2) {
          console.log('match queue', this.matchQueue); // debug
          playerEmitter.emit('matchReady', this.pickTwoRandomPlayersFromQueue());

          console.log("Match Queue updated: ", this.matchQueue); // debug
        }
      })
      .then(() => {
        console.log("Mutex Unlocked.. Username: ", player.username);
        console.log("Match Queue after Mutex Unlocked: ", this.matchQueue);
      });
  },

  /**
   * Returns a boolean (true|false) based on the existence of the player in the database. If the player was found in the
   * database, it means they are tracked so: true, else: false.
   * @param playerId
   * @returns {boolean}
   */
  isTracked(playerId) {
    // Try to find the player from reading the database
    const foundPlayer = this.findFromDatabase(playerId);

    // Return true if the player was found in the database, else return false to say (not tracked).
    return !!foundPlayer;
  },

  /**
   * Add an existing player to the active collection `this.allActiveUsers`.
   * @param player: Player
   */
  addAsActivePlayer(player) { // : void
    this.allActiveUsers.set(player.playerId, player);
  },

  /** Temp doc
   * Should be able to insert a player instance to the database. Will be used for recognizing signed-up users' whose data
   * will be recorded and analyzed.
   * @param player
   */
  addToDatabase(player) {
    // TODO: insert the new player to the database
  },

  /**
   * Adds the player's playerId to the `onlinePlayersIds` Set collection. If there were no player object in the `allActivePlayers`
   * collection, this method will try to find the player from the database and add it to the active users' collection.
   * And at the end will return true if no player were found.
   * @param playerId
   * @returns {boolean}
   */
  addAsOnline(playerId) {
    const foundPlayerInActivePlayersCollection = this.findActiveUserById(playerId);
    if (foundPlayerInActivePlayersCollection) {
      this.onlinePlayersIds.add(playerId);
      return true;
    }

    const foundPlayerInDatabase = this.findFromDatabase(playerId);
    if (foundPlayerInDatabase) {
      this.addAsActivePlayer(foundPlayerInActivePlayersCollection);
      this.onlinePlayersIds.add(playerId);
      return true;
    }

    return false;
  },

  makeOffline(player) {
    player.socketId = null;
    player.reSyncInRepo();
  },

  /**
   * Checks if the player's playerId exists in the `onlinePlayersIds` collection or not. If it does, this method will
   * return true, else: false.
   * @param playerId
   * @returns {boolean}
   */
  isOnline(playerId) {
    return this.onlinePlayersIds.has(playerId);
  },

  updateInDatabase(playerId, player) {
    // TODO: connect to sql to update this player.
  },

  /**
   * Updates the player object in the `allActiveUsers` collection. If there are no player in this collection, they will
   * be added to the collection because of the nature of Map.prototype.set
   * @param playerId
   * @param player
   */
  updateActivePlayer(playerId, player) {
    this.allActiveUsers.set(playerId, player);
  },

  /**
   * Delete a player from the active collection by their playerId
   * @param playerId
   */
  deleteFromActiveUsers(playerId) {
    this.allActiveUsers.delete(playerId);
  },

  deleteFromDatabase(playerId) {
  },

  /**
   * Fetches the player by playerId. First, checks for the player in the repo (active players). If it couldn't find the
   * player, it will try to search it in the database. If it found the user from database, it will automatically adds the
   * player object as an active player. If not, it will return null.
   * @param playerId
   * @returns {null|*}
   */
  fetchThePlayerById(playerId) {
    const foundPlayerInRepo = this.findActiveUserById(playerId);
    if (foundPlayerInRepo) {
      return foundPlayerInRepo;
    }

    const foundPlayerInDatabase = this.findFromDatabase(playerId);
    if (foundPlayerInDatabase) {
      this.addAsActivePlayer(foundPlayerInDatabase);
      return foundPlayerInDatabase;
    }

    return null;
  },

  findFromDatabase(playerId) {
    // TODO: ask the database for the player's information

    // TODO: return null if the database didn't have the user.

    // TODO: Make a new instance of the Player using player's information from database

    // TODO: return the new instance
  },

  /**
   * Find an active user by their playerId. Searches the playerId in the `allActiveUsers` Map collection.
   * @param playerId
   * @returns {*|null}
   */
  findActiveUserById(playerId) {
    return this.allActiveUsers.get(playerId) || null;
  },

  /**
   * Find an active player by their username. Searches the username in the `allActiveUsers` Map collections values.
   * @param username
   * @returns {Player | null}
   */
  findActivePlayerByUsername(username) { // : Player
    return Array.from(
        Map.values(this.allActiveUsers)
      )
        .find(player => player.username === username)
      || null;
  },

  findPlayerFromDatabaseByUsername(username) { // : Player
    // TODO: select the player where the username is equal to this username

    // TODO: return the found player as a player instance or just return null.
  },

  /**
   * Pick two random players from the match queue. This method functions similar to a lottery machine. It randomly picks
   * a ball (playerId) and removes the picked item from the collection.
   * @returns {null|*[]}
   */
  pickTwoRandomPlayersFromQueue() {
    if (this.matchQueue.length < 2)
      return null;

    let player1_index = Math.floor(Math.random() * this.matchQueue.length);
    let player1 = this.matchQueue[player1_index];

    this.matchQueue.splice(player1_index, 1);

    let player2_index = Math.floor(Math.random() * this.matchQueue.length);
    let player2 = this.matchQueue[player2_index];

    this.matchQueue.splice(player2_index, 1);

    return [player1, player2];
  },

  /**
   * Checks if the player is already in a match queue or not.
   * @param playerId
   * @returns {boolean}
   */
  isInMatchQueue(playerId) {
    return this.matchQueue.find(_playerId => _playerId === playerId) || false;
  }
};

module.exports = {Players, playerEmitter};