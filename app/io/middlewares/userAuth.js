const authExceptions = include('core/Exceptions/AuthExceptions');

const Tokens = include("app/repos/Tokens");
const Players = include("app/repos/Players").Players;

const Player = include("app/models/Player");

module.exports = (socket, next) => {
  const jwtToken = socket.handshake.auth.token;

  if (!jwtToken) {
    next(authExceptions.authFailed);
    return;
  }

  const foundTokenObj = Tokens.all.get(jwtToken);

  if (!foundTokenObj) {
    next(authExceptions.authFailed);
    return;
  }

  // Fetch the player
  let foundPlayer = Players.fetchThePlayerById(foundTokenObj.playerId);

  // If player does not exist at all.
  if (!foundPlayer) {
    let decodedData;
    try {
      // Decode the JWT token.
      decodedData = Tokens.verifyIntegrity(jwtToken);
    } catch (err) { // Failed to decode.
      console.log(err); // Fatal error
      next(err);
      return;
    }
    // Instantiate a new player to be added as a guest in our active players. Invalid instance.
    foundPlayer = Object.create(Player);

    // Initiate the player object as an online player.
    foundPlayer.initOnlinePlayer(decodedData.playerId, decodedData.username);
    Players.addAsActivePlayer(foundPlayer);
  }

  if (foundPlayer.socketId) {
    socket.server.connected[foundPlayer.socketId].disconnect();
    next(authExceptions.alreadyInMatch);
    return;
  }
  foundPlayer.socketId = socket.id;

  socket.user = foundPlayer;

  // console.log("Token: ", jwtToken);

  next();
};