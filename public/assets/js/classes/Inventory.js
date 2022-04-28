class Inventory {
    #counter = 4;

    type;

    counterRange = [0, 4];

    constructor(type) {
        this.type = type;
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
    }

    decreaseCounter() {
        this.counter--;
    }

    static all = {
        'block': new Inventory('block'),
        'attack': new Inventory('attack')
    };
}

export default Inventory;