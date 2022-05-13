// Components
import MovePlaceholder from '../components/MovePlaceholder.js';
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import AmmoIcon from "../components/Inventories/AmmoIcon.js";
import Timer from '../components/Timer.js';
import Tally from "../components/Tally.js";

const roundTitle = document.querySelector('div.round-title');
const Countdown = document.querySelector('div.countdown');
const doneButton = document.querySelector('div.done');

// Helpers
import Game from "./Game.js";
import Players from "./Players.js";
import RoundMove from "./RoundMove.js";
import Life from "../components/Inventories/Life.js";

import restingMode from "./restingMode.js";

// Utils
import wait from '../utils/wait.js';

class Round {
  #currentRoundNumber = 1;

  counterRange = [1, 5];

  get currentRoundNumber() {
    return this.#currentRoundNumber;
  }

  set currentRoundNumber(intendedResult) {
    if (intendedResult > this.counterRange[1]) {
      this.#currentRoundNumber = this.counterRange[1];
    } else if (intendedResult < this.counterRange[0]) {
      this.#currentRoundNumber = this.counterRange[0];
    } else {
      this.#currentRoundNumber = intendedResult;
    }
  }

  nextRound() {

  }

  updateRoundTitle() {
    roundTitle.innerHTML = `<span>Round ${this.currentRoundNumber}</span>`;
    roundTitle.classList.add("animate__bounceInDown")
  }

  increaseCounter() {
    this.currentRoundNumber++;
  }

  decreaseCounter() {
    this.currentRoundNumber--;
  }

  resetCounter() {
    this.currentRoundNumber = 1;
  }

  static tdCounter = 0;

  async donePressed() {
    // disabling buttons for a moment
    let doneBtn = document.querySelector(".done");
    doneBtn.disableClick(); // disabling done button
    Object.values(AmmoIcon.all)
      .map(ammoIconComponent => ammoIconComponent.iconElement.disableClick()); // disabling inventory ammo images/buttons.

    Object.values(MovePlaceholder.all)
      .map(movePlaceholderComponent => movePlaceholderComponent.target.disableClick()); // disabling the move placeholders

    // Reset the timer counter to be ready for the next round
    Timer.all['myTimer'].resetCounter();

    let myTally = Tally.all.player1;
    let opponentTally = Tally.all.player2;

    // Generating the Bot player's moves.
    const opponentMove = Players.all.player2.generateRandomMoves();
    console.log(opponentMove);

    // Fill my tally columns with my moves
    myTally.fillMoves();

    // Fill opponent's tally columns with their moves
    opponentTally.fillMoves();

    // Calculate players moves at each column AND gather them inside an array.
    let playerMoves = [];
    for (let index = 0; index < 3; index++) {
      let myMoveComponent = Object.values(Players.all.player1.moves.toJSON())[index];
      let opponentMoveComponent = Object.values(opponentMove)[index];
      playerMoves.push(this.singleCompare(myMoveComponent, opponentMoveComponent));
    }

    // Calculate the result of this round
    let roundResult = this.tripletCompare(playerMoves);

    // Aftermath
    if (roundResult === 1) { // Player 1 won ; Player 2 lost
      myTally.fillColumnVictory();

      setTimeout(function () {
        document.querySelector("#winRound").play();
      }, 750)

      opponentTally.fillColumnDefeat();

      Life.all.opponentLife.decreaseCounter();

      //winning round popup

      setTimeout(function () {
        let span = document.createElement("span");
        span.innerHTML = "+1";
        span.classList.add("roundResult");
        let roundPoints;

        if (Round.tdCounter === 0) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(2)");
        }
        if (Round.tdCounter === 1) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(3)");
        }
        if (Round.tdCounter === 2) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(4)");
        }
        if (Round.tdCounter === 3) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(5)");
        }
        if (Round.tdCounter === 4) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(6)");
        }
        
        roundPoints.appendChild(span);
        Round.tdCounter++;
      }, 350);

      setTimeout(function () {
        document.querySelector("span.roundResult").remove();
      }, 1400)

    } else if (roundResult === 2) { // Player 1 lost ; Player 2 won
      myTally.fillColumnDefeat();
      setTimeout(function () {
        document.querySelector("#loseRound").play();
      }, 700);

      opponentTally.fillColumnVictory();

      // Decrease my life
      Life.all.myLife.decreaseCounter();

      //losing round popup
      setTimeout(function () {

        let span = document.createElement("span");
        span.innerHTML = "-1";
        span.classList.add("roundResult");
        let roundPoints;

        if (Round.tdCounter === 0) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(2)")
        }
        if (Round.tdCounter === 1) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(3)")
        }
        if (Round.tdCounter === 2) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(4)")
        }
        if (Round.tdCounter === 3) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(5)")
        }
        if (Round.tdCounter === 4) {
          roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(6)")
        }

        roundPoints.appendChild(span);
        Round.tdCounter++
      }, 350);

      setTimeout(function () {
        document.querySelector("span.roundResult").remove();
      }, 1500);


    } else { // Draw
      myTally.fillColumnDraw();

      opponentTally.fillColumnDraw();

      Round.tdCounter++;
    }

    roundTitle.classList.remove("animate__bounceInDown")
    restingMode();

    console.log('life.all', Life.all);

    let leftPlayerTotalInventory =
      AmmoInventory.all['attack-left'].counter
      + AmmoInventory.all['block-left'].counter;
    let rightPlayerTotalInventory =
      AmmoInventory.all.opponentAttack.counter
      + AmmoInventory.all.opponentBlock.counter;

    if (
      this.currentRoundNumber < this.counterRange[1] // If this wasn't the last round
      && Life.all.myLife.counter > 0 // If player1 still has lives
      && Life.all.opponentLife.counter > 0 // If player2 still has lives
      && leftPlayerTotalInventory + rightPlayerTotalInventory !== 0 // If both sides have ammo inventories
    ) {

      setTimeout(async () => {
        document.querySelector("div.countdown-overlay").classList.remove("d-none");

        await this.roundCountdown();

        document.querySelector("div.countdown-overlay").classList.add("d-none");

        this.increaseCounter();

        setTimeout(() => {
          this.clearBoardForNewRound();
        }, 800);
      }, 1600);

    } else {
      // Evaluate the game
      await Game.currentGame.gameOver();

      let replayBtn = document.querySelector(".play-again");
      replayBtn.classList.add('replay-in-animation');
      replayBtn.classList.remove('replay-out-animation');
      replayBtn.classList.remove('d-none');

      document.querySelector('div.done').classList.add('d-none');
      document.querySelector('div.moves-placeholder').classList.add('d-none');
      this.resetCounter();
    }
  }

  // simple timeout between rounds, no extra animations
  clearBoardForNewRound() {

    // Resetting/Re-initializing the MovePlaceholders
    MovePlaceholder.resetAll();

    Players.all.player1.resetMoves();
    RoundMove.selectedMoveType = 'none';


    document.querySelector('div.done').classList.remove('d-none');
    document.querySelector('div.moves-placeholder').classList.remove('d-none');

    document.querySelectorAll('div.mv-placeholder').forEach((element) => {
      element.classList.remove('filled-block');
      element.classList.remove('filled-attack');
    });

    document.querySelectorAll('.pop-out-animation').forEach((element) => {
      element.classList.add('pop-in-animation');
      element.classList.remove('pop-out-animation');
    });

    const leftPigeon = document.querySelector('div.pigeons-container img.pigeon-left');
    leftPigeon.classList.add('picking-move-animation');
    leftPigeon.classList.remove('revert-pigeon-pick-move');

    this.updateRoundTitle();

    document.querySelectorAll('.hide-animation').forEach(element => {
      element.classList.add('show-animation');
      element.classList.remove('hide-animation');
    });

    // Start timer
    Timer.all["myTimer"].startCounter();

    // Enabling everything back for the next new round
    doneButton.enableClick(); // enabling done button

    Object.values(AmmoIcon.all)
      .map(ammoIconComponent => ammoIconComponent.iconElement.enableClick()); // enabling inventory ammo images/buttons.

    Object.values(MovePlaceholder.all)
      .map(movePlaceholderComponent => movePlaceholderComponent.target.enableClick()); // enabling the move placeholders

  }

  async roundCountdown() {
    for (let item of ['ready', 'set', 'go']) {
      Countdown.classList.add(item);
      await wait(500);
    }

    for (let item of ['ready', 'set', 'go']) {
      Countdown.classList.remove(item);
    }
  }

  singleCompare(move1, move2) {
    if (move1 === 'attack' && move2 === 'none') {
      return 1;
    } else if (move1 === 'none' && move2 === 'attack') {
      return 2;
    } else {
      return 0;
    }
  }

  tripletCompare(moves) {
    let ones = moves.filter(number => number === 1).length;
    let twos = moves.filter(number => number === 2).length;

    if (ones > twos) {
      return 1;
    } else if (ones < twos) {
      return 2;
    } else {
      return 0;
    }
  }

  static all = {}
}

export default Round;