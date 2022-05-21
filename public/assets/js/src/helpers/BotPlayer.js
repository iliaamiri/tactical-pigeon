import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Player from "./Player.js";
import RoundMove from "./RoundMove.js";


class BotPlayer extends Player {
  constructor(playerId = "__BOT__") {
    super(playerId, {
      'blocks': AmmoInventory.all.opponentBlock,
      'attacks': AmmoInventory.all.opponentAttack
    });
  }

  /**
   * Generates only one random move and handles the ammo decreasing
   * @returns {string}
   */
  getRandomMove() {
    // Getting the block and attack ammo for the bot.
    const blockAmmo = AmmoInventory.all.opponentBlock;
    const attackAmmo = AmmoInventory.all.opponentAttack;

    // Getting the number of ammo left for the opponent (bot).
    const blockAmmoCount = blockAmmo.counter;
    const attackAmmoCount = attackAmmo.counter;

    // Assign the move enums to a buffer (temporary variable).
    // making a 'copy' of the moveTypeEnum since we're manipulating it later with splice
    const availableMoves = JSON.parse(JSON.stringify(RoundMove.moveTypeEnum));

    // Limit the moves of the bot if they don't have any more attacks left.
    if (blockAmmoCount < 1)
      availableMoves.splice(availableMoves.indexOf('block'), 1);
    if (attackAmmoCount < 1)
      availableMoves.splice(availableMoves.indexOf('attack'), 1);

    // Generate (get) a random move based on the available moves.
    const generatedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    // Decrease the ammo of the bot based on the generated move.
    if (generatedMove === 'block')
      blockAmmo.decreaseCounter();
    if (generatedMove === 'attack')
      attackAmmo.decreaseCounter();

    // returning the generated move.
    return generatedMove;
  }

  /**
   * Generates the set of moves the bot player will have, using the getRandomMove method.
   * @returns {head: string, legs: string, body: string}
   */
  generateRandomMoves() {
    // Assigning the moves to the player's move instance.
    this.moves.head = this.getRandomMove();
    this.moves.body = this.getRandomMove();
    this.moves.legs = this.getRandomMove();

    // Returns the moves as a JSON object.
    return this.moves.toJSON();
  }
}

export default BotPlayer;