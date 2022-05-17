const Life = {
  gameId: null, // string (ref to Game)
  playerId: null, // int (ref to Player)

  lives: 3, // int e.g. 3, 2, 1, 0

  init(gameId, playerId) {
    this.gameId = gameId;
    this.playerId = playerId;
  },

  loseLife: function () {
    this.lives--;
  },

  gainLife: function () {
    this.lives++;
  },

  toJSON: function () {
    return {
      lives: this.lives,
    };
  },
};

module.exports = Life;