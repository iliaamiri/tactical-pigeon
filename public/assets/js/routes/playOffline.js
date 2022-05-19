// Component classes
import MovePlaceholder from '../components/MovePlaceholder.js';
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Timer from '../components/Timer.js';
import Tally from "../components/Tally.js";

const playAgainButton = document.querySelector(".play-again");
const countdownOverlayComponent = document.querySelector("div.countdown-overlay");
const nextButton = document.querySelector('.nextBtn');
const backButton = document.querySelector('.backBtn');
const backStartContainer = document.querySelector('.back-start');
const nextContainer = document.querySelector('.next');
const continueButton = document.querySelector(".continueBtn");
const backstoryContainer = document.querySelector('.backstory-container');
const objectivesBanner = document.querySelector('.objectives');
const pigeon = document.querySelector('div.pigeons-container img.pigeon-left');
const pickMoveOverlay = document.querySelector('div.move-picker-overlay');
const tutorialOverlay = document.querySelector('.tutorial-overlay');
const exitTutorialBtn = document.querySelector('.exit-tutorial');
const loadingCloudsOverlay = document.querySelector('div.loading-clouds-overlay');

// Helpers
import Game from "../helpers/Game.js";
import Player from "../helpers/Player.js";
import Players from "../helpers/Players.js";
import BotPlayer from "../helpers/BotPlayer.js";
import changeRoundTitle from "../helpers/changeRoundTitle.js";
import roundCountdown from "../helpers/roundCountdown.js";
import Cookie from "../helpers/Cookie.js";

// Core and Utils
import { sounds } from "../core/sounds.js";

// Auth
import Token from "../io/auth/Token.js";

// Fetch username from cookie
export let username = Token.fetchCachedUsernameOnly();

// Hide the clouds overlay and playAgainButton
loadingCloudsOverlay.classList.add("d-none");
playAgainButton.classList.add("d-none");

// inserting the username and 'computer' under the health bars
let myUsernameSpan = document.querySelector('div.my-username-div span.my-username-span');
myUsernameSpan.innerHTML = username;
let opponentUsernameSpan = document.querySelector('div.opponent-username-div span.opponent-username-span');
opponentUsernameSpan.innerHTML = 'computer';

//Initiating the game.
Game.currentGame = new Game("offline_game");
// Round.all.game1 = new Round();

// Initiating the players.
Players.all.player1 = new Player("AklBm4", {
  'blocks': AmmoInventory.all['block-left'],
  'attacks': AmmoInventory.all['attack-left']
});
Players.all.player2 = new BotPlayer();

// Initiating the move placeholders.
MovePlaceholder.all = {
  'head': new MovePlaceholder('head'),
  'body': new MovePlaceholder('body'),
  'legs': new MovePlaceholder('legs')
};

// Initiating the tallies.
Tally.all = {
  'player1': new Tally(document.querySelector('table.tally.my-tally'), Players.all.player1),
  'player2': new Tally(document.querySelector('table.tally.opponent-tally'), Players.all.player2)
};
Tally.all.player1.currentTallyColumnNumber = Game.currentGame.currentRound.currentRoundNumber + 1;

// check if old or new user.
if (Cookie.get(username)) {
  Cookie.set(username, "oldUser");

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
} else {
  Cookie.set(username, "newUser");

  // show the intro page
  document.querySelector(".intro-page").classList.remove("d-none");

  // Inserting the username into the blue banner on the intro overlay
  let blueBannerUsernameSpan = document.querySelector('div.blueBanner p.character');
  if (username !== null) {
    blueBannerUsernameSpan.innerHTML = `Hi ${username},<br>you are: PUSINESS MAN`;
  }

  // when Next is clicked in Intro, show the Objectives
  nextButton.addEventListener('click', event => {
    backstoryContainer.classList.add('d-none');
    nextContainer.classList.add('d-none');
    objectivesBanner.classList.remove('d-none');
    backStartContainer.classList.remove('d-none');
  });

  // when Back is clicked in Intro, whow the Backstory again
  backButton.addEventListener('click', event => {
    backstoryContainer.classList.remove('d-none');
    nextContainer.classList.remove('d-none');
    objectivesBanner.classList.add('d-none');
    backStartContainer.classList.add('d-none');
  });

  // background intro screen
  continueButton.addEventListener("click", async event => {
    console.log(event.target);
    event.target.classList.remove("unpressed");
    continueButton.classList.add("pressed");
    document.querySelector(".intro-page").classList.add("d-none");
    tutorialOverlay.classList.remove("d-none")
  });

  exitTutorialBtn.addEventListener("click", async event => {
    tutorialOverlay.classList.add("d-none")

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
  })

}
console.log(Cookie.get(username));

await import('./_common_play.js');