let myBlockCounter = document.querySelector('span.my-block-counter');

let myAttackCounter = document.querySelector('span.my-attack-counter');

let opponentBlockCounter = document.querySelector('span.opponent-block-counter');

let opponentAttackCounter = document.querySelector('span.opponent-attack-counter');

class Inventory {
    
    #counter = 4;

    type;

    counterRange = [0, 4];

    element;

    constructor(type, element) {
        this.type = type;
        this.element = element;
        this.element.innerHTML = `X${this.counter}`;
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
    }

    increaseCounter() {
        this.counter++;
        this.element.innerHTML = `X${this.counter}`;
    }

    decreaseCounter() {
        this.counter--;
        this.element.innerHTML = `X${this.counter}`;
    }

    static all = {
        'block-left': new Inventory('block', myBlockCounter),
        'attack-left': new Inventory('attack', myAttackCounter),
        'opponentBlock': new Inventory('block', opponentBlockCounter),
        'opponentAttack': new Inventory('attack', opponentAttackCounter)
    }
}

export default Inventory;