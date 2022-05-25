// Handler Functions
const searchForOpponent = require("./searchForOpponent");
const fetchCurrentStateOfGame = require("./fetchCurrentStateOfGame");
const roundSubmitMove = require("./roundSubmitMove");
const playerIsReady = require("./playerIsReady");

module.exports = async (io, socket) => {
  socket.on("game:iamready", playerIsReady(io, socket));
  socket.on("game:searchForOpponent", searchForOpponent(io, socket));
  socket.on("game:fetch", fetchCurrentStateOfGame(io, socket));
  socket.on("game:round:submitMove", roundSubmitMove(io, socket));
};
