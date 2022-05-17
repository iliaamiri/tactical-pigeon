const GameExceptions = {
  currentlyInGame: {
    errMessage: new Error("PLAYER_IS_ALREADY_IN_GAME"),
    userErrorMessage: "Player is already in the game.",
    httpStatus: 400
  },
  gameNotFound: {
    errMessage: new Error("GAME_NOT_FOUND"),
    userErrorMessage: "Game does not exist",
    httpStatus: 404
  },
  roundFinishedAlready: {
    errMessage: new Error("ROUND_FINISHED_ALREADY"),
    userErrorMessage: "This round is finished. Cannot submit move at this time.",
    httpStatus: 400
  }
};
module.exports = GameExceptions;