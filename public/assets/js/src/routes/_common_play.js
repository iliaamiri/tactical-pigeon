// Components
import Timer from "../components/Play/Timer.js";
import MovePlaceholder from "../components/Play/MovePlaceholder.js";
const body = document.querySelector('body');

// Helpers
import Game from "../helpers/Game.js";
import RoundMove from "../helpers/RoundMove.js";
import { backgroundsCssClassNames } from "../helpers/Backgrounds.js";

// Core and Utils
import { sounds } from "../core/sounds.js";
import Cookie from "../helpers/Cookie.js"

// Sounds
await import("../helpers/soundController.js");

// Set the map
let selectedMap = Cookie.get("selectedMap");
if (selectedMap && Object.keys(backgroundsCssClassNames).includes(selectedMap)) {
  body.classList.add(backgroundsCssClassNames[selectedMap]);
} else { // Or add the default background
  body.classList.add(backgroundsCssClassNames.street);
}

// Wrapping every click handler in one listener to be able to handle the spam clicks easier.
body.addEventListener('click', async event => {
  let target = event.target;

  // Checking if this element is not clickable
  let anyClosestCurrentlyNotClickable = target.closest('*.currently-not-clickable');

  if (anyClosestCurrentlyNotClickable) { // If it was not, just return here. Don't execute further. Stop. Die.
    return;
  }

  if (target.tagName === "DIV" && target.classList.contains("play-again")) {
    // console.log("user wants to play again!"); // debug
    Game.currentGame.resetGame();
  }

  if (target.tagName === "DIV" && target.classList.contains("back-home")) {
    // console.log("back to home"); // debug
    location.href = "/"
  }

  /* ---- Done ---- */
  if (target.tagName === "DIV" && target.classList.contains('doneStyled')) {
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
    // console.log('selectedMoveType', RoundMove.selectedMoveType); // debug
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
    // console.log(Game.currentGame.gameMode); // debug
    if (Game.currentGame.gameMode === "offline") {
      Timer.all['myTimer'].pauseCounter();
    }
    tutorialOverlay.classList.remove("d-none");
    tutorialOverlay.classList.add("animate__fadeInLeft");
    helpBtn.classList.remove("animate__infinite");
  }
  if (target.tagName === "SPAN" && target.classList.contains('exit-tutorial')) {
    tutorialOverlay.classList.add("d-none");
    tutorialOverlay.classList.remove("animate__fadeInLeft");
    // console.log(Game.currentGame.gameFinished); // debug
    if (Game.currentGame.gameFinished === "false") {
      Timer.all['myTimer'].startCounter();
    }
  }

  /* ---- Mute Button ---- */
  if (target.tagName === "DIV" && target.classList.contains('mute')) {
    // console.log("muting"); // debug
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
