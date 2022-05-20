import RoundMove from "./RoundMove.js";



class Player {
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

  /**
   * Resets all the moves of the player. Makes it ready for next rounds
   */
  resetMoves() {
    this.moves = new RoundMove();
  }
}

export default Player;