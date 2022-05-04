let myTimer = document.querySelector('div.timer-counter');
let myTimerCounter = document.querySelector('span.time-nums');

class Timer {
    #counter = 30;

    // timePerRound;

    counterRange = [0, 30];

    element;

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

    // increaseCounter() {
    //     this.counter++;
    // }

    startCounter() {
        setInterval(function () {
            // myTimerCounter.innerHTML = this.counter;
            this.counter--;
            console.log(this.counter)
            // this.element.innerHTML = this.counter;
            if (this.counter < 0) {
                clearInterval();
            }
        }, 1000);
    }

    resetCounter() {
        this.counter = 30;
    }

    static all = {
        'myTimer': new Timer(myTimerCounter)
    }
}

export default Timer;