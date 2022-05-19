const Tokens = require("../../repos/Tokens");
const {Players} = require("../../repos/Players");

const AuthExceptions = include('core/Exceptions/AuthExceptions');

module.exports = (strict = true) => {
  return (req, res, next) => {
    try {
      // Verify the JWT cookie's existence
      const jwtToken = req.cookies.JWT;
      if (!jwtToken) {
        throw AuthExceptions.authFailed;
      }

      // Find the token object of the player in the active dictionary.
      const foundTokenObj = Tokens.all.get(jwtToken);
      if (!foundTokenObj) {
        throw AuthExceptions.authFailed;
      }

      // Find the player object from the online players' collection.
      let foundPlayer = Players.find(foundTokenObj.playerId);
      if (!foundPlayer) {
        // Revoke the token that has no player attached to it.
        Tokens.revoke(jwtToken);

        throw AuthExceptions.authFailed;
      }

      req.user = foundPlayer;
    } catch (err) {
      if (strict) {
        throw err;
      }
    }

    next();
  }
};