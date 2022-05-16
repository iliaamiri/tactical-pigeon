const AuthExceptions = {
  badInput: {
    errMessage: new Error("INVALID_CREDENTIALS"),
    userErrorMessage: "Invalid input. Please try again.",
    httpStatus: 400
  },
  authFailed: {
    errMessage: new Error("AUTHENTICATION_FAILED"),
    userErrorMessage: "Failed to login. Please try again.",
    httpStatus: 403
  },
  alreadyInMatch: {
    errMessage: new Error("ALREADY_IN_GAME"),
    userErrorMessage: "User is already in match.",
    httpStatus: 400
  }
};
module.exports = AuthExceptions;