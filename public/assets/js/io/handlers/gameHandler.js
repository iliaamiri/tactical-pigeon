// Components
import {searchingText, searchingForOpponentAnimation} from "../../routes/home.js";

// Core
import {playSound, sounds} from "../../core/sounds.js";

export default async (io, socket) => {
  const matchFound = (payload) => {
    console.log("match found. payload: ", payload);

    const { gameId, players } = payload;

    // UI exhibits
    playSound(sounds.winRound);
    clearInterval(searchingForOpponentAnimation);
    searchingText.innerHTML = "Match found!";

    setTimeout(() => {
      location.href = "/play/" + gameId;
    }, 3000);
  };

  const fetchCurrentStateOfGame = (payload) => {
    console.log(payload);

    document.dispatchEvent(
      new CustomEvent('gameFetchedReady', {
        detail: {
          ...payload
        }
      })
    );
  };

  const receiveOpponentMoves = (moves, gameComplete) => {

  };

  socket.on('game:matchFound', matchFound);
  socket.on('game:fetch:result', fetchCurrentStateOfGame);
  socket.on('game:round:opponentMove', receiveOpponentMoves)
};
