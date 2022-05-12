import RoundMove from "./RoundMove.js";

class Player {
<<<<<<< HEAD
  // username of the player : String
  username;

  // Set of moves of the player : RoundMove
  moves = new RoundMove();

  ammoInventory = {
    'blocks': null, // : Inventory
    'attacks': null // : Inventory
  };

  constructor(username, ammoInventory) {
    this.username = username;
    this.ammoInventory = ammoInventory;
  }

=======
  // ID of the player : String
  playerId;

  // Name of the player which will be displayed : String
  playerName;

  // Set of moves of the player : RoundMove
  moves = new RoundMove();

  ammoInventory = {
    'blocks': null, // : Inventory
    'attacks': null // : Inventory
  };

  constructor(playerId, playerName, ammoInventory) {
    this.playerId = playerId;
    this.playerName = playerName;
    this.ammoInventory = ammoInventory;
  }

>>>>>>> team-multiplayer
  /**
   * Resets all the moves of the player. Makes it ready for next rounds
   */
  resetMoves() {
    this.moves = new RoundMove();
  }
}

export default Player;