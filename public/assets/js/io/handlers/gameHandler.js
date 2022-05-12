export default (io, socket) => {
  const matchFound = (payload) => {
    const {gameId, player2_username} = payload;
  }

  socket.on('game:matchFound', matchFound)
};
