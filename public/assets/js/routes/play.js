// Component classes
import MovePlaceholder from '../components/MovePlaceholder.js';
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Timer from '../components/Timer.js';
import Tally from "../components/Tally.js";

// Helpers
import Game from "../helpers/Game.js";
import Player from "../helpers/Player.js";
import Players from "../helpers/Players.js";
import BotPlayer from "../helpers/BotPlayer.js";
import RoundMove from "../helpers/RoundMove.js";
import changeRoundTitle from "../helpers/changeRoundTitle.js";
import roundCountdown from "../helpers/roundCountdown.js";

// Core and Utils
import { sounds } from "../core/sounds.js";

// Auth
import Token from "../io/auth/Token.js";

// Fetch username from cookie
export let username = Token.fetchCachedUsernameOnly();

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

/* ---- Scroll Effect ---- */
let speechbubble = document.querySelector(".bubble");
speechbubble.addEventListener("scroll", async event => {
  document.querySelector(".scrollMessage").classList.add("animate__bounceOutUp");
});

// background intro screen
document.querySelector(".continueBtn").addEventListener("click", async event => {
  console.log(event.target);
  event.target.classList.remove("unpressed");
  document.querySelector(".continueBtn").classList.add("pressed");
  document.querySelector(".intro-page").classList.add("d-none");
  // first round preparation
  document.querySelector(".play-again").classList.add("d-none");
  document.querySelector("div.countdown-overlay").classList.remove("d-none");
  document.querySelector("div.countdown-overlay").classList.add("opaque");

  await roundCountdown();

  changeRoundTitle(Game.currentGame.currentRound.currentRoundNumber);

  // First round start timer
  Timer.all['myTimer'].startCounter();

  document.querySelector("div.countdown-overlay").classList.add("d-none");
  document.querySelector("div.countdown-overlay").classList.remove("opaque");

  let pigeon = document.querySelector('div.pigeons-container img.pigeon-left');
  let pickMoveOverlay = document.querySelector('div.move-picker-overlay');

  pickMoveOverlay.classList.add('show-animation');
  pigeon.classList.add('picking-move-animation');

  document.querySelector('.moves-placeholder').classList.add('pop-in-animation');
  document.querySelector('.done').classList.add('pop-in-animation');
});

// Wrapping every click handler in one listener to be able to handle the spam clicks easier.
document.querySelector('body').addEventListener('click', async event => {
  // event.preventDefault();
  let target = event.target;

  // Checking if this element is not clickable
  let anyClosestCurrentlyNotClickable = target.closest('*.currently-not-clickable');

  if (anyClosestCurrentlyNotClickable) { // If it was not, just return here. Don't execute further. Stop. Die.
    return;
  }

  if (target.tagName === "DIV" && target.classList.contains("play-again")) {
    console.log("user wants to play again!");
    Game.currentGame.resetGame();
  }

  /* ---- Done ---- */
  if (target.tagName === "DIV" && target.classList.contains('done')) {
    await Game.currentGame.currentRound.donePressed();
  }

  /* ---- My Ammo ---- */
  if (target.tagName === "IMG" && target.classList.contains('my-shield')) {
    //console.log('shield selector hit!');

    // Here, we could move these logics to AmmoIcon class .click() method. And then just calling it here.
    // like this: (this currently wont work though. don't uncomment these).
    // AmmoIcon.all.player1_shield.click();
    // AmmoIcon.all.player1_attack.unclick();

    RoundMove.selectedMoveType = 'block';

    document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedShield.png");
    document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/attackfork-1.png");
  }

  if (target.tagName === "IMG" && target.classList.contains('my-attack')) {
    // console.log('sword selector hit!');

    // Here, we could move these logics to AmmoIcon class .click() method. And then just calling it here.
    // like this: (this currently wont work though. don't uncomment these).
    // AmmoIcon.all.player1_attack.click();
    // AmmoIcon.all.player1_shield.unclick();

    RoundMove.selectedMoveType = 'attack';

    document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedFork.png");
    document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png");
  }

  /* ---- Moves Placeholders ---- */
  let movesPlaceholder = target.closest('div.moves-placeholder');
  if (movesPlaceholder &&
    target.tagName === 'DIV' &&
    RoundMove.selectedMoveType !== 'none' &&
    target.classList.contains('mv-placeholder')
  ) {
    console.log('selectedMoveType', RoundMove.selectedMoveType);
    let bodyPartType;

    if (target.classList.contains('head')) {
      bodyPartType = 'head';
    } else if (target.classList.contains('body')) {
      bodyPartType = 'body';
    } else if (target.classList.contains('legs')) {
      bodyPartType = 'legs';
    }

    let currentMovePlaceholder = MovePlaceholder.all[bodyPartType];
    currentMovePlaceholder.bodyPartType = bodyPartType;
    currentMovePlaceholder.moveType = RoundMove.selectedMoveType;

    currentMovePlaceholder.check();
  }

  /* ---- Tutorial Overlay ---- */
  let tutorialOverlay = document.querySelector(".tutorial-overlay");
  let helpBtn = document.querySelector(".help");
  if (target.tagName === "DIV" && target.classList.contains('help')) {
    tutorialOverlay.classList.remove("d-none");
    tutorialOverlay.classList.add("animate__fadeInLeft");
    helpBtn.classList.remove("animate__infinite");
    Timer.all['myTimer'].pauseCounter();
  }
  if (target.tagName === "SPAN" && target.classList.contains('exit-tutorial')) {
    tutorialOverlay.classList.add("d-none");
    tutorialOverlay.classList.remove("animate__fadeInLeft");
    Timer.all['myTimer'].startCounter();
  }

  /* ---- Mute Button ---- */
  if (target.tagName === "DIV" && target.classList.contains('mute')) {
    console.log("muting");
    document.dispatchEvent(
      new CustomEvent('soundMuteToggle', {
        detail: {
          soundsToMute: [
            sounds.theme,
            sounds.loseGame,
            sounds.drawGame,
            sounds.winGame,
            sounds.loseRound,
            sounds.winRound,
            sounds.doneChecked,
            sounds.denyTheClick,
            sounds.forkChecked,
            sounds.shieldClicked,
            sounds.putInTheTally
          ]
        }
      })
    );
  }
});