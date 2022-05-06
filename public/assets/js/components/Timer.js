import Life from '../components/Life.js';
import Rounds from '../components/Rounds.js';
import Inventory from '../components/Inventory.js';

import calculateGameResults from "../helpers/calculateGameResults.js";
import roundCountdown from "../helpers/roundCountdown.js";
import clearBoardForNewRound from "../helpers/clearBoardForNewRound.js";
import restingMode from "../helpers/restingMode.js";
import Players from "../helpers/Players.js";
import tallyMoves from "../helpers/tallyMoves.js";

let myTimer = document.querySelector('div.timer-counter');
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
                tallyMoves();

                let leftPlayerTotalInventory = Inventory.all['attack-left'].counter + Inventory.all['block-left'].counter;
                let rightPlayerTotalInventory = Inventory.all.opponentAttack.counter + Inventory.all.opponentBlock.counter;
                if (
                    Rounds.all['game1'].counter < Rounds.all['game1'].counterRange[1] 
                    && Life.all.myLife.counter > 0 
                    && Life.all.opponentLife.counter > 0
                    && leftPlayerTotalInventory + rightPlayerTotalInventory !== 0
                ) {
                    restingMode();
                    setTimeout(async () => {
                        document.querySelector("div.countdown-overlay").classList.remove("d-none");
                        await roundCountdown();
                        // Timer.all['myTimer'].startCounter();
                        document.querySelector("div.countdown-overlay").classList.add("d-none");
                        Rounds.all['game1'].increaseCounter();
                        // console.log(Rounds.all['game1'].counter)
                        setTimeout(() => {
                            clearBoardForNewRound(Rounds.all['game1'].counter);
                        }, 800);
                    }, 1600);
                    this.resetCounter();
                } else {
                    restingMode();
                    this.resetCounter();
                    let resultOverlay = document.querySelector(".result-banner");
                    let gameResult = calculateGameResults();
                    console.log('game result', gameResult);
                    if (gameResult === 'win') {
                        resultOverlay.classList.add('victory');
                    } else if (gameResult === 'loss') {
                        resultOverlay.classList.add('defeat');
                    } else {
                        resultOverlay.classList.add('draw');
                    }
                    // resultOverlay.classList.add('victory');
                    // resultOverlay.classList.add('draw');
                    // resultOverlay.classList.add('defeat');
                    // console.log(resultOverlay);
                    let replayBtn = document.querySelector(".play-again");
                    replayBtn.classList.add('replay-in-animation');
                    replayBtn.classList.remove('replay-out-animation');
                    replayBtn.classList.remove('d-none');

                    document.querySelector('div.done').classList.add('d-none');
                    document.querySelector('div.moves-placeholder').classList.add('d-none');
                    Rounds.all['game1'].resetCounter();
                }
            }
        }, 1000);
    }

    resetCounter() {
        this.counter = 30;
        clearInterval(this.interval);
    }

    static all = {
        'myTimer': new Timer(myTimerCounter)
    }
}

export default Timer;