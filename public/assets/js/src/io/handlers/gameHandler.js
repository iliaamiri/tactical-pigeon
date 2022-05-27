// Components
import SearchingText from "../../components/Home/SearchingText.js";
import SearchingForOpponent from "../../components/Home/SearchingForOpponent.js";

// Core
import {playSound, sounds} from "../../core/sounds.js";

export default async (io, socket) => {
  const matchFound = (payload) => {
    console.log("match found. payload: ", payload); // debug

    const { gameId, players } = payload;

    // UI exhibits
    playSound(sounds.winRound);
    SearchingForOpponent.clearAnimation();
    if (SearchingText.DOMElement) {
      SearchingText.DOMElement.innerHTML = "Match found!";
    }

    setTimeout(() => {
      location.href = "/play/" + gameId;
    }, 3000);
  };

  const fetchCurrentStateOfGame = (payload) => {
    // console.log(payload); // debug

    document.dispatchEvent(
      new CustomEvent('gameFetchedReady', {
        detail: {
          ...payload
        }
      })
    );
  };

  const opponentReadyToo = () => {
    document.dispatchEvent(
      new CustomEvent('opponentReadyToo')
    );
  };

  const wonOpponentLeft = () => {
    console.log("Event Emitted: wonOpponentLeft")

    document.dispatchEvent(
      new CustomEvent('wonOpponentLeft')
    );
  };

  const wonOpponentBeforeGameStarted = () => {
    console.log("Event Emitted: wonOpponentBeforeGameStarted");

    document.dispatchEvent(
      new CustomEvent('wonOpponentLeftBeforeGameStarted')
    );
  }

  const opponentReconnected = () => {
    console.log("Event Emitted: opponentReconnected")

    document.dispatchEvent(
      new CustomEvent('opponentReconnected')
    );
  };

  const opponentDisconnected = () => {
    console.log("Event Emitted: opponentDisconnected")

    document.dispatchEvent(
      new CustomEvent('opponentDisconnected')
    );
  };

  socket.on('game:ready:start', opponentReadyToo);
  socket.on('game:matchFound', matchFound);
  socket.on('game:fetch:result', fetchCurrentStateOfGame);
  socket.on('game:won:opponentLeft', wonOpponentLeft);
  socket.on('game:won:opponentLeft:beforeGameStarted', wonOpponentBeforeGameStarted);
  socket.on('game:opponentReconnected', opponentReconnected);
  socket.on('game:opponentDisconnected', opponentDisconnected);
};
