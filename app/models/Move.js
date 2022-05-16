const Move = {
  roundId: null,
  playerId: null,

  moveEnums: ["attack", "block", "none"], // string[]

  head: 'none', // string<moveEnums>
  body: 'none', // string<moveEnums>
  legs: 'none',  // string<moveEnums>

  updateMoves(moves) {
    const { head, body, legs } = moves;
    this.head = head;
    this.body = body;
    this.legs = legs;
  },

  toJSON: function () {
    return {
      head: this.head,
      body: this.body,
      legs: this.legs,
    };
  },
};

module.exports = Move;