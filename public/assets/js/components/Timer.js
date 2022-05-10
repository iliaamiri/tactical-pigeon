import Life from './Inventories/Life.js';
import Rounds from '../components/Rounds.js';
import AmmoInventory from './Inventories/AmmoInventory.js';

import calculateGameResults from "../helpers/calculateGameResults.js";
import roundCountdown from "../helpers/roundCountdown.js";
import clearBoardForNewRound from "../helpers/clearBoardForNewRound.js";
import restingMode from "../helpers/restingMode.js";
import Players from "../helpers/Players.js";

import donePressed from "../helpers/donePressed.js";


// let myTimer = document.querySelector('div.timer-counter');
let myTimerCounter = document.querySelector('span.time-nums');

class Timer {
    #counter = 30;

    // timePerRound;

    counterRange = [0, 30];

    element;

    interval;

    constructor(element) {
        this.element = element;
        this.element.innerHTML = this.counter;
    }

    get counter() { return this.#counter; }
    set counter(intendedResult) {
        if (intendedResult > this.counterRange[1]) {
            this.#counter = this.counterRange[1];
        } else if (intendedResult < this.counterRange[0]) {
            this.#counter = this.counterRange[0];
        } else {
            this.#counter = intendedResult;
        }

        this.element.innerHTML = `${this.counter}`;
    }

    startCounter() {
        this.interval = setInterval(() => {
            // myTimerCounter.innerHTML = this.counter;
            this.counter--;
            // this.element.innerHTML = this.counter;
            if (this.counter === 0) {

                donePressed()
                
                // const opponentMove = Players.all.player2.generateRandomMoves();
                // console.log(opponentMove)

                // let opponentTallyColumn = document.querySelectorAll(`table.tally.opponent-tally td:nth-child(${Rounds.all['game1'].counter})`);
                // console.log('opponent', opponentTallyColumn);
                // opponentTallyColumn.forEach((td, index) => {
                //     let moveComponent = Object.values(opponentMove)[index];
                //     if (moveComponent === 'attack') {
                //         td.classList.add('cell-attacked');
                //     } else if (moveComponent === 'block') {
                //         td.classList.add('cell-blocked');
                //     }
                // });

                // let myTallyColumn = document.querySelectorAll(`table.tally.my-tally td:nth-child(${Rounds.all['game1'].counter})`);

                // if (Object.values(opponentMove).includes("attack")) {
                //     myTallyColumn.forEach(td => {
                //         td.classList.add('round-defeat');
                //     });
                //     opponentTallyColumn.forEach(td => {
                //         td.classList.add('round-won');
                //     });
                //     Life.all.myLife.decreaseCounter();
                // } else {
                //     myTallyColumn.forEach(td => {
                //         td.classList.add('round-draw');
                //     });
                //     opponentTallyColumn.forEach(td => {
                //         td.classList.add('round-draw');
                //     });
                // }

                // if (Rounds.all['game1'].counter < Rounds.all['game1'].counterRange[1] && Life.all.myLife.counter > 0 && Life.all.opponentLife.counter > 0) {
                //     restingMode();
                //     this.resetCounter();

                //     setTimeout(() => {
                //         document.querySelector("div.countdown-overlay").classList.remove("d-none");
                //         roundCountdown();
                //     }, 5000)

                //     setTimeout(() => {
                //         document.querySelector("div.countdown-overlay").classList.add("d-none");
                //         Rounds.all['game1'].increaseCounter();
                //         clearBoardForNewRound(Rounds.all['game1'].counter);
                //     }, 9000);
                // } else {
                //     restingMode();
                //     this.resetCounter();
                //     let resultOverlay = document.querySelector(".result-banner");
                //     let gameResult = calculateGameResults();
                //     console.log('game result', gameResult);
                //     if (gameResult === 'win') {
                //         resultOverlay.classList.add('victory');
                //     } else if (gameResult === 'loss') {
                //         resultOverlay.classList.add('defeat');
                //     } else {
                //         resultOverlay.classList.add('draw');
                //     }
                //     // resultOverlay.classList.add('victory');
                //     // resultOverlay.classList.add('draw');
                //     // resultOverlay.classList.add('defeat');
                //     // console.log(resultOverlay);
                //     let replayBtn = document.querySelector(".play-again");
                //     replayBtn.classList.add('replay-in-animation');
                //     replayBtn.classList.remove('replay-out-animation');
                //     replayBtn.classList.remove('d-none');

                //     document.querySelector('div.done').classList.add('d-none');
                //     document.querySelector('div.moves-placeholder').classList.add('d-none');
                //     Rounds.all['game1'].resetCounter();
                // }

            }
        }, 1000);
    }

    resetCounter() {
        this.counter = 30;
        clearInterval(this.interval);
    }

    pauseCounter() {
        clearInterval(this.interval);
    }

    static all = {
        'myTimer': new Timer(myTimerCounter)
    }
}

export default Timer;