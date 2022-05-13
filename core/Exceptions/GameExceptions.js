const GameExceptions = {
  currentlyInGame: {
    errMessage: new Error("PLAYER_IS_ALREADY_IN_GAME"),
    httpStatus: 400
  },
  gameNotFound: {
    errMessage: new Error("GAME_NOT_FOUND"),
    httpStatus: 404
  }
};
module.exports = GameExceptions;