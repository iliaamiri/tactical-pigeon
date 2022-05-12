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
    // let myTallyColumn = document.querySelectorAll(`table.tally.my-tally td:nth-child(${this.currentRoundNumber + 1})`);
    // let opponentTallyColumn = document.querySelectorAll(`table.tally.opponent-tally td:nth-child(${this.currentRoundNumber})`);

    // Generating the Bot player's moves.
    const opponentMove = Players.all.player2.generateRandomMoves();
    console.log(opponentMove);

    // Fill my tally columns with my moves
    myTally.fillMoves();
    // myTallyColumn.forEach((td, index) => {
    //     let moveComponent = Object.values(Players.all.player1.moves.toJSON())[index];
    //     if (moveComponent === 'attack') {
    //         td.classList.add('cell-attacked');
    //     } else if (moveComponent === 'block') {
    //         td.classList.add('cell-blocked');
    //     }
    // });

    // Fill opponent's tally columns with their moves
    opponentTally.fillMoves();
    // opponentTallyColumn.forEach((td, index) => {
    //     let moveComponent = Object.values(opponentMove)[index];
    //     if (moveComponent === 'attack') {
    //         td.classList.add('cell-attacked');
    //     } else if (moveComponent === 'block') {
    //         td.classList.add('cell-blocked');
    //     }
    // });

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
      // myTallyColumn.forEach(td => {
      //     td.classList.add('round-won');
      //     setTimeout(function () {
      //         document.querySelector("#winRound").play()
      //     }, 750)
      // });

      setTimeout(function () {
        document.querySelector("#winRound").play()
      }, 750)

      opponentTally.fillColumnDefeat();
      // opponentTallyColumn.forEach(td => {
      //     td.classList.add('round-defeat');
      // });

      Life.all.opponentLife.decreaseCounter();

      //winning round popup

      setTimeout(function () {
        let span = document.createElement("span"); // <p></p>
        span.innerHTML = "+1";
        span.classList.add("roundResult");
        let myTable = document.querySelector("table.my-tally");
        myTable.appendChild(span);

        if (Round.tdCounter === 0) {
          span.style.left = "+7vw";
          span.style.top = "-1vw";
        }

        if (Round.tdCounter === 1) {
          span.style.left = "+11.6vw";
          span.style.top = "-1vw";
        }

        if (Round.tdCounter === 2) {
          span.style.left = "+15.5vw";
          span.style.top = "-1vw";
        }
        if (Round.tdCounter === 3) {
          span.style.left = "+19.5vw";
          span.style.top = "-1vw";
        }
        if (Round.tdCounter === 4) {
          span.style.left = "+24.5vw";
          span.style.top = "-1vw";
        }

        Round.tdCounter++;
      }, 350);

      setTimeout(function () {
        document.querySelector("span.roundResult").remove()
      }, 1400);


    } else if (roundResult === 2) { // Player 1 lost ; Player 2 won
      myTally.fillColumnDefeat();
      setTimeout(function () {
        document.querySelector("#loseRound").play()
      }, 700);
      // myTallyColumn.forEach(td => {
      //     td.classList.add('round-defeat');
      //     setTimeout(function () {
      //         document.querySelector("#loseRound").play()
      //     }, 700)
      // });

      opponentTally.fillColumnVictory();
      // opponentTallyColumn.forEach(td => {
      //     td.classList.add('round-won');
      // });

      // Decrease my life
      Life.all.myLife.decreaseCounter();

      //losing round popup
      setTimeout(function () {
        let span = document.createElement("span"); // <p></p>
        span.innerHTML = "-1";
        span.classList.add("roundResult");
        let myTable = document.querySelector("table.my-tally");
        myTable.appendChild(span);
        if (Round.tdCounter === 0) {
          span.style.left = "+7vw";
          span.style.top = "-1vw";
        }

        if (Round.tdCounter === 1) {
          span.style.left = "+11.6vw";
          span.style.top = "-1vw";
        }

        if (Round.tdCounter === 2) {
          span.style.left = "+15.5vw";
          span.style.top = "-1vw";
        }
        if (Round.tdCounter === 3) {
          span.style.left = "+19.5vw";
          span.style.top = "-1vw";
        }
        if (Round.tdCounter === 4) {
          span.style.left = "+24.5vw";
          span.style.top = "-1vw";
        }

        console.log(Round.tdCounter);
        Round.tdCounter++;

      }, 350);

      setTimeout(function () {
        document.querySelector("span.roundResult").remove();
      }, 1500);


    } else { // Draw
      myTally.fillColumnDraw();
      // myTallyColumn.forEach(td => {
      //     td.classList.add('round-draw');
      // });

      opponentTally.fillColumnDraw();
      // opponentTallyColumn.forEach(td => {
      //     td.classList.add('round-draw');
      // });

      Round.tdCounter++;
    }

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
        // document.querySelector("div.countdown-overlay").classList.add("transparent");

        await this.roundCountdown();
        // await roundCountdown();

        // Timer.all['myTimer'].startCounter();
        document.querySelector("div.countdown-overlay").classList.add("d-none");
        // document.querySelector("div.countdown-overlay").classList.remove("transparent");

        this.increaseCounter();
        //Round.all['game1'].increaseCounter();

        // console.log(Rounds.all['game1'].counter)
        setTimeout(() => {
          // clearBoardForNewRound(Round.all['game1'].counter);
          this.clearBoardForNewRound();
        }, 800);
      }, 1600);

    } else {
      // Evaluate the game
      await Game.currentGame.gameOver();

      // resultOverlay.classList.add('draw');
      // resultOverlay.classList.add('defeat');
      // console.log(resultOverlay);
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

    //MovePlaceholder.checked = false;

    // -- To avoid repeating ourselves a little bit here, we can put this logic inside of a static method in MovePlaceholder class
    // MovePlaceholder.all = {
    //     'head': new MovePlaceholder('head'),
    //     'body': new MovePlaceholder('body'),
    //     'legs': new MovePlaceholder('legs')
    // };

    // Resetting/Re-initializing the MovePlaceholders
    MovePlaceholder.resetAll();

    //Move.myMoves = {
    //head: null,
    //body: null,
    //legs: null
    //};
    //Move.selectedMoveType = null;
    Players.all.player1.resetMoves();
    RoundMove.selectedMoveType = 'none';

    //console.log('MovePlaceholder', MovePlaceholder.all);

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
    //console.log('left pigeon', leftPigeon);
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
    // let index = 4;
    // let countdownArr = [null, 'Go!', '1', '2', '3'];

    // (function runCount() {
    //     if (index === 0) {
    //         return;
    //     } else {
    //         Countdown.innerHTML = countdownArr[index];
    //         setTimeout(() => {
    //             index--;
    //             runCount();
    //         }, 500);
    //     }
    // })();

    // function runCount(time, _countdownArr, cb) {
    //     const countdownArr = [..._countdownArr]
    //     const item = countdownArr.shift();
    //     if (countdownArr.length === 0) {
    //         return;
    //     }
    //     cb(item)
    //     requestAnimationFrame()
    //     setTimeout(() => {
    //         window.requestAnimationFrame(() => runCount(countdownArr))
    //     }, time);
    // }
    // runCount(500, ['Go!', '1', '2', '3'], (item => {
    //     Countdown.innerHTML = item
    // }))


    // async function wait(time) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(resolve, time)
    //     })
    // }

    // for (let item of ['3', '2', '1', 'Go!']) {
    //     Countdown.innerHTML = item
    //     await wait(500)
    // }


    // async function wait(time) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(resolve, time)
    //     })
    // }

    // for (let item of ['3', '2', '1', 'Go!']) {
    //     Countdown.innerHTML = item
    //     await wait(500)
    // }

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