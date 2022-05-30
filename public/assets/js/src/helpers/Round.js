// Components
import MovePlaceholder from '../components/Play/MovePlaceholder.js';
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import AmmoIcon from "../components/Inventories/AmmoIcon.js";
import Timer from '../components/Play/Timer.js';
import Tally from "../components/Tallies/Tally.js";
import DoneButton from "../components/DoneButton.js";
import RoundPoints from "../components/Tallies/RoundPoints.js";
import BackHomeButton from "../components/Play/BackHomeButton.js";
import ReplayButton from "../components/Play/ReplayButton.js";
import WaitSign from "../components/Multiplayer/WaitSign.js";
import LeftPigeon from "../components/Pigeons/LeftPigeon.js";
import RightPigeon from "../components/Pigeons/RightPigeon.js";


const roundTitle = document.querySelector('div.round-title');
const Countdown = document.querySelector('div.countdown');

// Helpers
import Game from "./Game.js";
import Players from "./Players.js";
import RoundMove from "./RoundMove.js";
import Life from "../components/Inventories/Life.js";

import restingMode from "./restingMode.js";

// Cores and Utils
import wait from '../utils/wait.js';
import {socket} from "../io/client.js";

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
    roundTitle.classList.add("animate__bounceInDown");
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
    DoneButton.click();

    Object.values(AmmoIcon.all)
      .map(ammoIconComponent => ammoIconComponent.iconElement.disableClick()); // disabling inventory ammo images/buttons.

    Object.values(MovePlaceholder.all)
      .map(movePlaceholderComponent => movePlaceholderComponent.target.disableClick()); // disabling the move placeholders

    // Reset the timer counter to be ready for the next round
    Timer.all['myTimer'].resetCounter();

    let myTally = Tally.all.player1;
    let opponentTally = Tally.all.player2;

    let opponentMove;
    if (playMode === "online") {
      const { receivedOpponentMoves, gameComplete } = await new Promise((resolve, reject) => {
        // web socket emit "game:round:submitMove" with payload: gameId
        socket.emit("game:round:submitMove", {
          gameId: gameId,
          move: Players.all.player1.moves.toJSON()
        });

        // Custom error
        socket.on(":error", err => {
          console.log("App Error: ", err);
        });

        // console.log(opponentMove); // debug
        if (!opponentMove) {
          WaitSign.show("Waiting for opponent");
        }

        document.addEventListener('opponentMoveReady', event => {
          // Destructure all the fetched data.
          const { opponentMoves, gameComplete } = event.detail;

          // console.log('opponentmoveready event listener', event); // debug

          WaitSign.hide();

          // Save the game to the localStorage
          // TODO: update opponentMove and MoveHistory on LocalStorage

          resolve({
            receivedOpponentMoves: opponentMoves,
            gameComplete
          });
        });
      });

      // Setting the opponent's move to its instance.
      opponentMove = receivedOpponentMoves;
      Object.keys(opponentMove).map(bodyPart => {
        let move = opponentMove[bodyPart];
        Players.all.player2.moves[bodyPart] = opponentMove[bodyPart];
        if (move === "attack") {
          Players.all.player2.ammoInventory.attacks.counter--;
        }
        if (move === "block") {
          Players.all.player2.ammoInventory.blocks.counter--;
        }
      });
    } else {
      // Generating the Bot player's moves.
      opponentMove = Players.all.player2.generateRandomMoves();
    }

    // console.log("Opponent Moves: ", opponentMove); // debug

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

    if (playerMoves.includes(1)) {
      // Decrease opponent life
      Life.all.opponentLife.decreaseCounter();
    }

    if (playerMoves.includes(2)) {
      // Decrease my life
      Life.all.myLife.decreaseCounter();
    }

    // Calculate the result of this round
    let roundResult = this.tripletCompare(playerMoves);

    // Aftermath
    if (roundResult === 1) { // Player 1 won ; Player 2 lost
      myTally.fillColumnVictory();
      setTimeout(() => {
        LeftPigeon.renderRoundWinning();
        RightPigeon.renderRoundLosing();
      }, 600)

      setTimeout(function () {
        document.querySelector("#winRound").play();
      }, 750)

      setTimeout(() => {
        LeftPigeon.renderNormalPhase();
        RightPigeon.renderNormalPhase();
      }, 1440);

      opponentTally.fillColumnDefeat();

      // Decrease opponent life
      /* Life.all.opponentLife.decreaseCounter(); */

      //winning round popup

      RoundPoints.exhibit("win", "+1");

    } else if (roundResult === 2) { // Player 1 lost ; Player 2 won

      setTimeout(() => {
        LeftPigeon.renderRoundLosing();
        RightPigeon.renderRoundWinning();
      }, 600);

      myTally.fillColumnDefeat();

      setTimeout(function () {
        document.querySelector("#loseRound").play();
      }, 700);

      setTimeout(() => {
        LeftPigeon.renderNormalPhase();
        RightPigeon.renderNormalPhase();
      }, 1440);

      opponentTally.fillColumnVictory();

      // Decrease my life
      /* Life.all.myLife.decreaseCounter(); */

      //losing round popup
      RoundPoints.exhibit("lose", "-1");

    } else { // Draw
      myTally.fillColumnDraw();
      opponentTally.fillColumnDraw();

      setTimeout(() => {
        LeftPigeon.renderRoundDraw();
        RightPigeon.renderRoundDraw();
      }, 650);

      setTimeout(() => {
        LeftPigeon.renderNormalPhase();
        RightPigeon.renderNormalPhase();
      }, 1500);

      RoundPoints.exhibit("draw", "draw!");
    }

    roundTitle.classList.remove("animate__bounceInDown")
    restingMode();

    // console.log('life.all', Life.all); // debug

    let leftPlayerTotalInventory =
      AmmoInventory.all['attack-left'].counter
      + AmmoInventory.all['block-left'].counter;
    let rightPlayerTotalInventory =
      AmmoInventory.all.opponentAttack.counter
      + AmmoInventory.all.opponentBlock.counter;

    // change back timer background to blue on new round
    document.querySelector(".timer-counter").classList.remove("red");
    document.querySelector(".timer-counter").classList.add("blue");

    if ( 
      ( // EITHER:
        this.currentRoundNumber === this.counterRange[1] // If this was the last round
        || Life.all.myLife.counter === 0 // If player1 has 0 lives
        || Life.all.opponentLife.counter === 0 // If player2 has 0 lives
        || leftPlayerTotalInventory + rightPlayerTotalInventory === 0  // if both players have 0 inventory
      ) || ( // OR:
        Life.all.myLife.counter !== Life.all.opponentLife.counter // lives are unequal
        && AmmoInventory.all['attack-left'].counter === 0 // and there are no forks left...
        && AmmoInventory.all.opponentAttack.counter === 0 // ... for both players
      )
    ) {
      // Finish and evaluate the game
      await Game.currentGame.gameOver();

      // Play again button
      ReplayButton.show();

      // Show the back to Home button
      BackHomeButton.show();

      DoneButton.hide();
      document.querySelector('div.moves-placeholder').classList.add('d-none');
      this.resetCounter();
    } else {
      setTimeout(async () => {
        document.querySelector("div.countdown-overlay").classList.remove("d-none");

        await this.roundCountdown();

        document.querySelector("div.countdown-overlay").classList.add("d-none");

        this.increaseCounter();

        setTimeout(() => {
          this.clearBoardForNewRound();
        }, 800);
      }, 1600);
    }
  }

  // simple timeout between rounds, no extra animations
  clearBoardForNewRound() {

    // Resetting/Re-initializing the MovePlaceholders
    MovePlaceholder.resetAll();

    Players.all.player1.resetMoves();
    RoundMove.selectedMoveType = 'none';


    DoneButton.hide();
    document.querySelector('div.moves-placeholder').classList.remove('d-none');

    document.querySelectorAll('div.mv-placeholder').forEach((element) => {
      element.classList.remove('filled-block');
      element.classList.remove('filled-attack');
    });

    document.querySelectorAll('.pop-out-animation').forEach((element) => {
      element.classList.add('pop-in-animation');
      element.classList.remove('pop-out-animation');
    });

    LeftPigeon.enterMovePickingMode();

    this.updateRoundTitle();

    document.querySelectorAll('.hide-animation').forEach(element => {
      element.classList.add('show-animation');
      element.classList.remove('hide-animation');
    });

    // Start timer
    Timer.all["myTimer"].startCounter();

    // Enabling everything back for the next new round
    DoneButton.reset();

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

  fillTheTalliesWithMoveHistory(moveHistory) {
    // console.log("move history ", moveHistory); // debug

    let player1Tally = Tally.all.player1;
    let player2Tally = Tally.all.player2;

    for (let i = 0; i < moveHistory.length; i++) {
      let roundMoves = moveHistory[i];
      let player1Moves = roundMoves.player1;
      let player2Moves = roundMoves.player2;

      // Fill my tally columns with my moves
      player1Tally.fillMoves(player1Moves);

      // Fill opponent's tally columns with their moves
      player2Tally.fillMoves(player2Moves);

      // Calculate players moves at each column AND gather them inside an array.
      let playerMoves = [];
      for (let index = 0; index < 3; index++) {
        let player1MoveComponent = Object.values(player1Moves)[index];
        let player2MoveComponent = Object.values(player2Moves)[index];

        playerMoves.push(this.singleCompare(player1MoveComponent, player2MoveComponent));
      }

      // Calculate the result of this round
      let roundResult = this.tripletCompare(playerMoves);

      // Aftermath
      if (roundResult === 1) { // Player 1 won ; Player 2 lost
        player1Tally.fillColumnVictory();
        player2Tally.fillColumnDefeat();
      } else if (roundResult === 2) { // Player 1 lost ; Player 2 won
        player1Tally.fillColumnDefeat();
        player2Tally.fillColumnVictory();
      } else { // Draw
        player1Tally.fillColumnDraw();
        player2Tally.fillColumnDraw();
      }
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