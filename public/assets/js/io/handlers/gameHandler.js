// Components
import SearchingText from "../../components/Home/SearchingText.js";
import SearchingForOpponent from "../../components/Home/SearchingForOpponent.js";

// Core
import {playSound, sounds} from "../../core/sounds.js";

export default async (io, socket) => {
  const matchFound = (payload) => {
    console.log("match found. payload: ", payload);

    const { gameId, players } = payload;

    // UI exhibits
    playSound(sounds.winRound);
    SearchingForOpponent.clearAnimation();
    SearchingText.DOMElement.innerHTML = "Match found!";

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

  const receiveOpponentMoves = (payload) => {
    const { opponentMoves, gameComplete } = payload;
    console.log("Opponent Moves received: ", opponentMoves);
    console.log("Game Complete: ", gameComplete);

    document.dispatchEvent(
      new CustomEvent('opponentMoveReady', {
        detail: {
          opponentMoves, gameComplete
        }
    )
  };

  socket.on('game:matchFound', matchFound);
  socket.on('game:fetch:result', fetchCurrentStateOfGame);
  socket.on('game:round:opponentMove', receiveOpponentMoves)
};
