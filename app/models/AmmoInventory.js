const AmmoInventory = {
    gameId, // string (ref to Game)
    playerId, // int (ref to Player)

    blockCount: 4,
    attackCount: 4,

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

    toJSON: function() {
        return {
            blockCount: this.blockCount,
            attackCount: this.attackCount
        };
    },

};

module.exports = AmmoInventory;