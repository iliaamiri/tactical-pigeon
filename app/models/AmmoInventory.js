const AmmoInventory = {
  gameId: null, // string (ref to Game)
  playerId: null, // int (ref to Player)

  blockCount: 4,
  attackCount: 4,

  init(gameId, playerId) {
    this.gameId = gameId;
    this.playerId = playerId;
  },

  blockIncrease() {
    this.blockCount++;
  },

  blockDecrease() {
    this.blockCount--;
  },

  attackIncrease() {
    this.attackCount++;
  },

  attackDecrease() {
    this.attackCount--;
  },

  getTotalInventory() {
    const totalInventory = this.blockCount + this.attackCount;
    return totalInventory;
  },

  getAttacks() {
    return this.attackCount;
  },

  getBlocks() {
    return this.blockCount;
  },

  toJSON() {
    return {
      blockCount: this.blockCount,
      attackCount: this.attackCount
    };
  },

};

module.exports = AmmoInventory;