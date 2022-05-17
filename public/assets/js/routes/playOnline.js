// Components
import Timer from "../components/Timer.js";
import MovePlaceholder from "../components/MovePlaceholder.js";
const loadingCloudsOverlay = document.querySelector('div.loading-clouds-overlay');
const playAgainButton = document.querySelector(".play-again");
const countdownOverlayComponent = document.querySelector("div.countdown-overlay");
const pigeon = document.querySelector('div.pigeons-container img.pigeon-left');
const pickMoveOverlay = document.querySelector('div.move-picker-overlay');

// Helpers
import changeRoundTitle from "../helpers/changeRoundTitle.js";
import Game from "../helpers/Game.js";
import roundCountdown from "../helpers/roundCountdown.js";

// Core and utils
import clientSocketConnect from "../io/client.js";
import LocalStorageCache from "../core/LocalStorageCache.js";

console.log("Hit playOnline.js");

let socket;
try {
  socket = await clientSocketConnect();

  socket.on('connect_error', err => {
    let message = err.message;
    console.log(message);
    if (message === "AUTHENTICATION_FAILED") {
      alert("Authentication Failed. Please try again.");

      location.href = "/";
      return;
    }
  });
} catch (err) {
  console.log(err);
}

// Instantiate the Game. gameId comes from play.ejs
let game = new Game(gameId, "online");

// Loading the game (Exhibition)
document.querySelector(".intro-page").classList.add("d-none"); // Hide the intro-page
playAgainButton.classList.add("d-none"); // Hide the play again button
loadingCloudsOverlay.classList.remove("d-none"); // show the loading clouds overlay

await new Promise((resolve, reject) => {
  console.log("hitting HERE")
  // Check if there are caches to load from
  let cachedGameFound = Game.findByGameFromCache();
  if (!cachedGameFound) { // If not, fetch information from the server.
    // web socket emit "game:fetch" with payload: gameId
    socket.emit("game:fetch", gameId);

    document.addEventListener('gameFetchedReady', event => {
      // Destructure all the fetched data.
      const { playerMe, playerOpponent, gameComplete } = event.detail;

      console.log(event); // debug

      // Save the game to the localStorage
      LocalStorageCache.saveGame(playerMe, playerOpponent, gameComplete);

      // initiate everything from the beginning
      game.initiateOnline(playerMe, playerOpponent, gameComplete);

      resolve(event);
    });
  } else {
    game.initiateOnline(...cachedGameFound);
  }
});

// Initiating the move placeholders.
MovePlaceholder.all = {
  'head': new MovePlaceholder('head'),
  'body': new MovePlaceholder('body'),
  'legs': new MovePlaceholder('legs')
};

countdownOverlayComponent.classList.remove("d-none");
countdownOverlayComponent.classList.add("opaque");

await roundCountdown();

changeRoundTitle(Game.currentGame.currentRound.currentRoundNumber);

// First round start timer
Timer.all['myTimer'].startCounter();

countdownOverlayComponent.classList.add("d-none");
countdownOverlayComponent.classList.remove("opaque");

pickMoveOverlay.classList.add('show-animation');
pigeon.classList.add('picking-move-animation');

document.querySelector('.moves-placeholder').classList.add('pop-in-animation');
document.querySelector('.done').classList.add('pop-in-animation');

await import('./_common_play.js');