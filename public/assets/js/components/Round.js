import changeRoundTitle from "../helpers/changeRoundTitle";

const roundTitle = document.querySelector('div.round-title');

class Round {
    #counter = 1;

    counterRange = [1, 5];

    get counter() { return this.#counter; }
    set counter(intendedResult) {
        if (intendedResult > this.counterRange[1]) {
            this.#counter = this.counterRange[1];
        } else if (intendedResult < this.counterRange[0]) {
            this.#counter = this.counterRange[0];
        } else {
            this.#counter = intendedResult;
        }
    }

    nextRound() {

    }

    updateRoundTitle() {
        roundTitle.innerHTML = `<span>Round ${this.counter}</span>`;
    }

    increaseCounter() {
        this.counter++;
    }

    decreaseCounter() {
        this.counter--;
    }

    resetCounter() {
        this.counter = 1;
    }

    static all = {
        
    }
}

export default Round;