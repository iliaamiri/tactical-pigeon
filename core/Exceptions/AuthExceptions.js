const AuthExceptions = {
    badInput: {
        errMessage: new Error("INVALID_CREDENTIALS"),
        httpStatus: 400
    },
    authFailed: {
        errMessage: new Error("AUTHENTICATION_FAILED"),
        httpStatus: 403
    }
};
module.exports = AuthExceptions;