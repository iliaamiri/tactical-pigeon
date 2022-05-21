class Rounds {
  #counter = 1;

  counterRange = [1, 5];

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

  static all = {}
}

export default Rounds;