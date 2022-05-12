import Game from '../helpers/Game.js';

class Tally {
  tallyElement;
  player;

  currentTallyColumnNumber = Game.currentGame.currentRound.currentRoundNumber;

  constructor(tallyElement, player) {
    this.tallyElement = tallyElement;
    this.player = player;
  }

  fillMoves() {
    let tallyColumn = this.tallyElement.querySelectorAll(`td:nth-child(${this.currentTallyColumnNumber})`);
    tallyColumn.forEach((td, index) => {
      let moveComponent = Object.values(this.player.moves.toJSON())[index];
      if (moveComponent === 'attack') {
        td.classList.add('cell-attacked');
      } else if (moveComponent === 'block') {
        td.classList.add('cell-blocked');
      }
    });
  }

  fillColumnDefeat() {
    let tallyColumn = this.tallyElement.querySelectorAll(`td:nth-child(${this.currentTallyColumnNumber})`);
    tallyColumn.forEach(td => {
      td.classList.add('round-defeat');
    });
    this.currentTallyColumnNumber++;
  }

  fillColumnVictory() {
    let tallyColumn = this.tallyElement.querySelectorAll(`td:nth-child(${this.currentTallyColumnNumber})`);
    tallyColumn.forEach(td => {
      td.classList.add('round-won');
    });
    this.currentTallyColumnNumber++;
  }

  fillColumnDraw() {
    let tallyColumn = this.tallyElement.querySelectorAll(`td:nth-child(${this.currentTallyColumnNumber})`);
    tallyColumn.forEach(td => {
      td.classList.add('round-draw');
    });
    this.currentTallyColumnNumber++;
  }

  static all = {};
};

export default Tally;