export default async (io, socket) => {
  const matchFound = (payload) => {
    console.log("match found. payload: ", payload);
    const { gameId, players } = payload;

    // let game = new Game()
    // game.save()
    location.href = "/play/" + gameId;
  }

  socket.on('game:matchFound', matchFound);
};
