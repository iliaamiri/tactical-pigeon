const AuthExceptions = {
  badInput: {
    errMessage: new Error("INVALID_CREDENTIALS"),
    httpStatus: 400
  },
  authFailed: {
    errMessage: new Error("AUTHENTICATION_FAILED"),
    httpStatus: 403
  },
  alreadyInMatch: {
    errMessage: new Error("ALREADY_IN_GAME"),
    httpStatus: 400
  }
};
module.exports = AuthExceptions;