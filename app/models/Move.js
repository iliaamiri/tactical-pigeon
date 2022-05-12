const Move = {
    roundId: null,
    playerId: null,

    moveEnums: ["attack", "block", "none"], // string[]

    head: 'none', // string<moveEnums>
    body: 'none', // string<moveEnums>
    legs: 'none',  // string<moveEnums>

    toJSON: function() {
        return {
            head: this.head,
            body: this.body,
            legs: this.legs,
        };
    },
};

module.exports = Move;