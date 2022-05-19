const GameExceptions = {
  currentlyInGame: {
    errMessage: "PLAYER_IS_ALREADY_IN_GAME",
    userErrorMessage: "Player is already in the game.",
    httpStatus: 400
  },
  gameNotFound: {
    errMessage: "GAME_NOT_FOUND",
    userErrorMessage: "Game does not exist",
    httpStatus: 404
  },
  roundFinishedAlready: {
    errMessage: "ROUND_FINISHED_ALREADY",
    userErrorMessage: "This round is finished. Cannot submit move at this time.",
    httpStatus: 400
  },
  gameAlreadyStarted: {
    errMessage: "GAME_ALREADY_STARTED",
    userErrorMessage: "Both players are ready. Game is already started.",
    httpStatus: 400
  },
  playerAlreadyInMatchQueue: {
    errMessage: "PLAYER_ALREADY_IN_MATCH_QUEUE",
    userErrorMessage: "You are already in a match queue.",
    httpStatus: 400
  },
};
module.exports = GameExceptions;