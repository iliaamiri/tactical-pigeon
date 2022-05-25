function preparePayloadAndEmit(io, foundGame, otherPlayerMove, thisPlayerMove, thisPlayer, otherPlayer) {
  let thisPlayerPayload = {
    opponentMoves: otherPlayerMove.toJSON(),
    gameComplete: foundGame.gameComplete
  };
  let otherPlayerPayload = {
    opponentMoves: thisPlayerMove.toJSON(),
    gameComplete: foundGame.gameComplete
  };

  // console.log("emitting the opponent moves", thisPlayerPayload, otherPlayerPayload); // debug

  io.to(thisPlayer.socketId).emit("game:round:opponentMove", thisPlayerPayload);
  io.to(otherPlayer.socketId).emit("game:round:opponentMove", otherPlayerPayload);
}

module.exports = preparePayloadAndEmit;