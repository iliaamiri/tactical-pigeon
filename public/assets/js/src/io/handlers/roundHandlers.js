export default (io, socket) => {
  const receiveOpponentMoves = (payload) => {
    const { opponentMoves, gameComplete } = payload;
    // console.log("Opponent Moves received: ", opponentMoves);
    // console.log("Game Complete: ", gameComplete);

    document.dispatchEvent(
      new CustomEvent('opponentMoveReady', {
        detail: {
          opponentMoves, gameComplete
        }
      })
    );
  };

  socket.on('game:round:opponentMove', receiveOpponentMoves);
};
