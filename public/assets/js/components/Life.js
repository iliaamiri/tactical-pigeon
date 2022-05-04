let myLifeNodes = document.querySelectorAll('div.myHealthBar div.heart');
let opponentLifeNodes = document.querySelectorAll('div.opponentHealthBar div.heart');

class Life {
  #counter;

  counterRange = [0, 3];

  lifeNodeList;

  constructor(lifeNodeList) {
    this.lifeNodeList = lifeNodeList;
    // thought we should initialize the counter too
    this.counter = this.counterRange[1];
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
      for (let index = this.lifeNodeList.length - 1; index >= 0; index--) {
        if (this.lifeNodeList[index].classList.contains('heart-filled')) {
          this.lifeNodeList[index].classList.remove('heart-filled');
          this.lifeNodeList[index].classList.add('heart-empty');
          break;
        }
      }
  }

  static all = {
      'myLife': new Life(myLifeNodes),
      'opponentLife': new Life(opponentLifeNodes)
  }

}

export default Life;