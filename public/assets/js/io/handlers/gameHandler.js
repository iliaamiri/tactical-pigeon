// Components
import {searchingText, searchingForOpponentAnimation} from "../../routes/home.js";

// Core
import {playSound, sounds} from "../../core/sounds.js";

export default async (io, socket) => {
  const matchFound = (payload) => {
    console.log("match found. payload: ", payload);

    const { gameId, players } = payload;

    // TODO: Initiate a new game and save gameId and players to localStorage. (CACHE)
    // let game = new Game()
    // game.save()

    // UI exhibits
    playSound(sounds.winRound);
    clearInterval(searchingForOpponentAnimation);
    searchingText.innerHTML = "Match found!";

    setTimeout(() => {
      location.href = "/play/" + gameId;
    }, 3000);
  }

  socket.on('game:matchFound', matchFound);
};
