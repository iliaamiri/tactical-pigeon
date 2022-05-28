const AuthExceptions = {
  badInput: {
    errMessage: "INVALID_CREDENTIALS",
    userErrorMessage: "Invalid input. Please try again.",
    httpStatus: 400
  },
  authFailed: {
    errMessage: "AUTHENTICATION_FAILED",
    userErrorMessage: "Failed to login. Please try again.",
    httpStatus: 403
  },
  alreadyInMatch: {
    errMessage: "ALREADY_IN_GAME",
    userErrorMessage: "User is already in match.",
    httpStatus: 400
  },
  alreadyAuthenticated: {
    errMessage: "ALREADY_AUTHENTICATED",
    userErrorMessage: "You are already logged-in.",
    httpStatus: 200
  },
  emailAlreadyExists: {
    errMessage: "EMAIL_ALREADY_EXISTS",
    userErrorMessage: "Email already exists.",
    httpStatus: 400
  },
};
module.exports = AuthExceptions;