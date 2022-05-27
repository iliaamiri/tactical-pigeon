const EventEmitter = require('events');
const playerEmitter = new EventEmitter();

const database = require("../../databaseAccessLayer");

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

  // console.log('two players are ready to be matched:', playersArr); // debug 🪲

  // Create new game instance and initiate it.
  const game = Object.create(Game);
  game.initNewGame(playersArr);

  // console.log('game newly created and Initiated', JSON.parse(JSON.stringify(game)), "playersArr: ", playersArr);

  // Initiate the players' inventories and lives for a new game.
  playersArr.forEach(player => {
    // Initiate the players for a new game (prepare them for a new game).
    player.initForNewGame(game);
  });

  // Add the game instance to the Games collection.
  Games.add(game);

  // console.log('Games.all', Games.showAll()); // debug

  // Signal `gameReady` Event and pass the game instance to the socket handler.
  playerEmitter.emit('gameReady', game);
});

const Players = {
  playerEmitter: playerEmitter, // playerEmitter Event

  /* A Map collection of all the active users. The purpose of this property is to cache the active players the program
  actively reads and writes. In short, this will help performance.

  Definition of an active user:
    1. A user who was recently called by the client side and their information were used.
    2. A guest user who did not sign up and is always treated as an untracked user whose activity nor information
       will not be saved in our database.

  Active users can be easily removed in these scenarios:
    1. The tracked user has not been queried in the app for a long time.
    2. The guest user's last login date was a long time ago. (2 days).
  */
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
    // console.log('adding player to match queue', player);
    this.matchQueue.push(player.playerId);
    //console.log('match queue length', this.matchQueue.length); // debug
    const mutex = new Mutex();
    mutex
      .runExclusive(() => {
        if (this.matchQueue.length >= 2) {
          console.log('match queue', this.matchQueue); // debug
          const pickedPlayers = this.pickTwoRandomPlayersFromQueue();
          if (pickedPlayers) {
            playerEmitter.emit('matchReady', pickedPlayers);
          }

          console.log("Match Queue updated: ", this.matchQueue); // debug
        }
      })
      .then(() => {
        console.log("Mutex Unlocked.. Username: ", player.username);
        console.log("Match Queue after Mutex Unlocked: ", this.matchQueue);
      });
  },

  removeFromMatchQueue(playerId) {
    let index = this.matchQueue.indexOf(playerId);
    if (index > -1) {
      delete this.matchQueue[index];
    }
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

  isGuest(player) {
    return this.isUsernameInGuestIdFormat(player.username);
  },

  isUsernameInGuestIdFormat(username) {
    return username?.substring(0, 6) === "guest_";
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
  async addToDatabase(player) {
    // Insert the new player to the database
    let result;
    try {
      result = await database.playerEntity.addUser({
        username: player.username,
        password: player.password
      });
      return player;
    } catch (err) {
      console.error("SQL error: ", new Error(result));
      return err;
    }
  },

  disconnected(player) {
    player.socketId = null;
    player.reSyncInRepo();
  },

  /**
   * Fetches the player object. If the player object's socketId property wasn't null, it means that the player is online.
   * @param playerId
   * @param Player
   * @returns {boolean}
   */
  isOnline(playerId, Player) {
    const foundPlayer = this.fetchThePlayerById(playerId, Player);
    return !!(foundPlayer.socketId);
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
    // TODO: connects to sql and deletes a user
  },

  /**
   * Fetches the player by playerId. First, checks for the player in the repo (active players). If it couldn't find the
   * player, it will try to search it in the database. If it found the user from database, it will automatically adds the
   * player object as an active player. If not, it will return null.
   * @param playerId
   * @param Player
   * @returns {null|*}
   */
  async fetchThePlayerById(playerId, Player) {
    const foundPlayerInRepo = this.findActiveUserById(playerId);
    if (foundPlayerInRepo) {
      return foundPlayerInRepo;
    }

    const foundPlayerInDatabase = await this.findFromDatabase(playerId);
    if (foundPlayerInDatabase) {
      const playerInstance = Object.create(Player);
      playerInstance.initOnlinePlayer(foundPlayerInDatabase.playerId, foundPlayerInDatabase.username, foundPlayerInDatabase.email, foundPlayerInDatabase.games_played, foundPlayerInDatabase.games_won, foundPlayerInDatabase.games_lost);
      this.addAsActivePlayer(playerInstance);
      return playerInstance;
    }

    return null;
  },

  async findFromDatabase(playerId) {
    // TODO: ask the database for the player's information
    const foundPlayer = await database.playerEntity.getUserById(playerId);
    if (!foundPlayer) {
      return null;
    }
    const playerInfo = foundPlayer;
    return {
      playerId: playerInfo.player_id,
      email: playerInfo.email,
      username: playerInfo.username,
      games_played: playerInfo.games_played,
      games_won: playerInfo.games_won,
      games_lost: playerInfo.games_lost
    };
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
   * Provides and interface for finding guest users. Even though in our policy we identify the guest users by their guestId
   * in the player's username, we don't want to confuse them with tracked users in the code.
   * @param guestId
   * @returns {Player|null}
   */
  findGuestUser(guestId) {
    return this.findActivePlayerByUsername(guestId);
  },

  /**
   * Find an active player by their username. Searches the username in the `allActiveUsers` Map collections values.
   * @param username
   * @returns {Player | null}
   */
  findActivePlayerByUsername(username) { // : Player
    return Array.from(
        this.allActiveUsers.values()
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

    let player1_index;
    let player1;
    for (let i = 0; i < 4; i++) {
      player1_index = Math.floor(Math.random() * this.matchQueue.length);
      player1 = this.matchQueue[player1_index];
      if (player1 !== undefined) {
        break;
      }

      // Remove the bad index
      this.matchQueue.splice(player1_index, 1);
    }
    if (!player1) {
      return null;
    }

    this.matchQueue.splice(player1_index, 1);

    let player2_index;
    let player2;
    for (let i = 0; i < 4; i++) {
      player2_index = Math.floor(Math.random() * this.matchQueue.length);
      player2 = this.matchQueue[player2_index];
      if (player2 !== undefined) {
        break;
      }

      // Remove the bad index
      this.matchQueue.splice(player2_index, 1);
    }
    if (!player2) {
      return null;
    }

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