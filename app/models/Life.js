const Life = {
  gameId: null, // string (ref to Game)
  playerId: null, // int (ref to Player)

  lifeRange: [0, 3],
  lives: 3, // int e.g. 3, 2, 1, 0

  init(gameId, playerId) {
    this.gameId = gameId;
    this.playerId = playerId;
  },

  loseLife: function () {
    if (this.lives - 1 < this.lifeRange[0]) {
      return;
    }
    this.lives--;
  },

  gainLife: function () {
    if (this.lives + 1 > this.lifeRange[1]) {
      return;
    }
    this.lives++;
  },

  toJSON: function () {
    return {
      lives: this.lives,
    };
  },
};

module.exports = Life;