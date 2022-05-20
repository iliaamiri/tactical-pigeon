// Repos
const Tokens = require("../../repos/Tokens");
const {Players} = require("../../repos/Players");

// Models
const Player = require("../../models/Player");

// Exceptions
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

      // Try finding the player
      let foundPlayer;
      if (Players.isUsernameInGuestIdFormat(foundTokenObj.username)) { // If the player is a guest
        // Just try finding them in the memory (active players). This attempt will exclude querying the database.
        foundPlayer = Players.findGuestUser(foundTokenObj.playerId);
      } else {
        // Find the player object from the online players' collection. This attempt potentially will include querying the database.
        foundPlayer = Players.fetchThePlayerById(foundTokenObj.playerId);
      }

      // If the player couldn't be found.
      if (!foundPlayer) {
        let decodedData;
        try {
          // Decode the JWT token.
          decodedData = Tokens.verifyIntegrity(jwtToken);
        } catch (err) { // Failed to decode.
          console.log(err); // Fatal error
          throw AuthExceptions.authFailed;
        }

        if (!decodedData) {
          // Token that is not integrate. Red flag!
          throw AuthExceptions.authFailed;
        }

        // Instantiate a new player to be added as a guest in our active players. Invalid instance.
        foundPlayer = Object.create(Player);

        // Initiate the player object as an online player.
        foundPlayer.initOnlinePlayer(decodedData.playerId, decodedData.username);
        Players.addAsActivePlayer(foundPlayer);

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