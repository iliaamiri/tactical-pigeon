let myBlockCounter = document.querySelector('span.my-block-counter');

let myAttackCounter = document.querySelector('span.my-attack-counter');

let opponentBlockCounter = document.querySelector('span.opponent-block-counter');

let opponentAttackCounter = document.querySelector('span.opponent-attack-counter');

class AmmoInventory {

  #counter = 4;

  type;

  counterRange = [0, 4];

  element;

  constructor(type, element) {
    this.type = type;
    this.element = element;
    this.element.innerHTML = `X${this.counter}`;
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

    this.element.innerHTML = `X${this.counter}`;
  }

  increaseCounter() {
    this.counter++;
  }

  decreaseCounter() {
    this.counter--;
  }

  resetCounter() {
    this.counter = 4;
  }

  static getTotalInventory(player) {
    let playerAmmo = player.ammoInventory;
    return playerAmmo.blocks.counter + playerAmmo.attacks.counter;
  }

  static all = {
    'block-left': new AmmoInventory('block', myBlockCounter),
    'attack-left': new AmmoInventory('attack', myAttackCounter),
    'opponentBlock': new AmmoInventory('block', opponentBlockCounter),
    'opponentAttack': new AmmoInventory('attack', opponentAttackCounter)
  }
};

export default AmmoInventory;