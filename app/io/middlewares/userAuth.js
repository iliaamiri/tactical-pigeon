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

  let foundPlayer = Players.find(foundTokenObj.playerId);

  if (!foundPlayer) {
    foundPlayer = Object.create(Player);
    try {
      let decodedData = Tokens.verifyIntegrity(jwtToken);
      foundPlayer.initOnlinePlayer(decodedData.playerId, decodedData.username);
      Players.add(foundPlayer);
    } catch (err) {
      next(err);
      return;
    }
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