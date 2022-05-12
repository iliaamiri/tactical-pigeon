const Life = {
  gameId: null, // string (ref to Game)
  playerId: null, // int (ref to Player)

  lives: 3, // int e.g. 3, 2, 1, 0

  loseLife: function () {
    this.lives--;
  },

  gainLife: function () {
    this.lives++;
  },

  toJSON: function () {
    return {
      gameId: this.gameId,
      playerId: this.playerId,
      lives: this.lives,
    };
  },
};

module.exports = Life;