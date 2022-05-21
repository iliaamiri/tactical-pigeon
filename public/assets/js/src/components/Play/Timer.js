import Game from "../../helpers/Game.js";

let myTimerCounter = document.querySelector('span.time-nums');

class Timer {
  #counter = 30;

  counterRange = [0, 30];

  element;

  interval;

  constructor(element) {
    this.element = element;
    this.element.innerHTML = this.counter;
  }

  get counter() {
    return this.#counter;
  }

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
    this.interval = setInterval(async () => {
      this.counter--;
      if (this.counter === 0) {

        await Game.currentGame.currentRound.donePressed();

      } else if (this.counter === 10) {
        // change timer background to red at 10 seconds
        document.querySelector(".timer-counter").classList.remove("blue");
        document.querySelector(".timer-counter").classList.add("red");
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
};

export default Timer;