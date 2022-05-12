export default (io, socket) => {
  const receiveOpponentMove = (payload) => {
    const {gameId, moves, gameComplete} = payload;
  };

  socket.on('game:round:opponentMove', receiveOpponentMove);
}