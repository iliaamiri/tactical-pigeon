const jwt = require("jsonwebtoken");
const configs = include("config/app.config");

const Tokens = include("app/repos/Tokens");
const Players = include("app/repos/Players");

const Player = include("app/models/Player");

module.exports = (socket, next) => {
  console.log("HOOSH")
  console.log("asdfd")

  const jwtToken = socket.handshake.auth.token;

  const err = new Error("AUTHENTICATION_FAILED");
  err.data = {type: 'AUTH_FAILURE'};

  console.log("aoo")

  if (!jwtToken) {
    next(err);
    return;
  }

  console.log("aoo")

  const foundTokenObj = Tokens.all.get(jwtToken);

  if (!foundTokenObj) {
    next(err);
    return;
  }

  let foundPlayer = Players.find(foundTokenObj.playerId);

  console.log("aoo")

  if (!foundPlayer) {
    foundPlayer = Object.create(Player);
    try {
      let decodedData = jwt.verify(jwtToken, configs.JWT_RSA_PUBLIC_KEY, {algorithm: "RS256"});
      foundPlayer.initOnlinePlayer(decodedData.playerId, decodedData.username);
      Players.add(foundPlayer);
    } catch (err) {
      next(err);
      return;
    }
  }

  socket.user = foundPlayer;

  console.log("Token: ", jwtToken);

  next();
};