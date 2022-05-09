const AmmoInventory = {
    gameId, // string (ref to Game)
    playerId, // int (ref to Player)

    blockCount,
    attackCount,

    blockIncrease, // function: void
    blockDecrease, // function: void
    attackIncrease, // function: void
    attackDecrease, // function: void

    getTotalInventory, // function: number

    // toJSON: function() {
    //     return {
    //         blockCount: this.blockCount,
    //         attackCount: this.attackCount
    //     }
    // }
};



module.exports = AmmoInventory;