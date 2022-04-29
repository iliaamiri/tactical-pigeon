import Move from './classes/Move.js';
import MovePlaceholder from './classes/MovePlaceholder.js';
import Inventory from "./classes/Inventory.js";

let currentSelectedInventory;

const gameResultEnum = ['loss', 'win', 'draw'];

function singleCompare(move1, move2) {
    if (move1 === 'attack' && move2 === null) {
      return 1;
    } else if (move1 === null && move2 === 'attack') {
      return 2;
    } else {
      return 0;
    }
  };

function tripletCompare(moves) {
    let ones = moves.filter(number => number === 1).length;
    let twos = moves.filter(number => number === 2).length;

    if (ones > twos) {
        return 1
    } else if (ones < twos) {
        return 2
    } else {
        return 0;
    }
}

  const acceptableMovesEnums = ["attack", "block", "none"];

  const acceptableMoves = {
      "attack": "a",
      "block": "b",
      "none": ""
  };

  const results = {
      "player 1 wins": "won",
      "player 2 wins": "lost",
      "nothing happened": "draw"
  };

  const getRandomMove = () => acceptableMovesEnums[Math.floor(Math.random() * acceptableMovesEnums.length)];

  

  /* const opponentMove = {
      'head': getRandomMove(),
      'body': getRandomMove(),
      'legs': getRandomMove()
  } */

  const opponentMove = {
    'head': 'attack',
    'body': 'block',
    'legs': null
    }

  console.log('opponentMove', opponentMove);







document.querySelector('body').addEventListener('click', async event => {
    event.preventDefault();
});

document.querySelector('div.done').addEventListener('click', async event => {
    console.log("HERE")
    let myTallyFirstColumn = document.querySelectorAll('table.tally.my-tally td:first-child');
   
    console.log('my', myTallyFirstColumn);
    
    myTallyFirstColumn.forEach((td, index) => {
        let moveComponent = Object.values(Move.myMoves)[index];
        if (moveComponent === 'attack') {
            td.classList.add('cell-attacked');
        } else if (moveComponent === 'block') {
            td.classList.add('cell-blocked');
        }
        
    });

    let opponentTallyFirstColumn = document.querySelectorAll('table.tally.opponent-tally td:first-child');
    console.log('opponent', opponentTallyFirstColumn);
    opponentTallyFirstColumn.forEach((td, index) => {
        let moveComponent = Object.values(opponentMove)[index];
        if (moveComponent === 'attack') {
            td.classList.add('cell-attacked');
            Inventory.all.opponentAttack.decreaseCounter();
        } else if (moveComponent === 'block') {
            td.classList.add('cell-blocked');
            Inventory.all.opponentBlock.decreaseCounter();
        }
        
    });

    let playerMoves = [];
    for (let index = 0; index < 3; index++) {
        let myMoveComponent = Object.values(Move.myMoves)[index];
        let opponentMoveComponent = Object.values(opponentMove)[index];
        playerMoves.push(singleCompare(myMoveComponent, opponentMoveComponent));
    }
    
    console.log('playermoves', playerMoves);

    let roundResult = tripletCompare(playerMoves);
    if (roundResult === 1) {
        myTallyFirstColumn.forEach(td => {
            td.classList.add('round-won');
        });
        opponentTallyFirstColumn.forEach(td => {
            td.classList.add('round-defeat');
        });
    } else if (roundResult === 2) {
        myTallyFirstColumn.forEach(td => {
            td.classList.add('round-defeat');
        });
        opponentTallyFirstColumn.forEach(td => {
            td.classList.add('round-won');
        });
    } else {
        myTallyFirstColumn.forEach(td => {
            td.classList.add('round-draw');
        });
        opponentTallyFirstColumn.forEach(td => {
            td.classList.add('round-draw');
        });
    }
    
});

document.querySelector('img.my-shield').addEventListener('click', async event => {
    console.log('shield success!');
    Move.selectedMoveType = 'block';
    const myBlockCounter = document.querySelector('span.my-block-counter');
    currentSelectedInventory = Inventory.all['myBlock'];
});

document.querySelector('img.my-attack').addEventListener('click', async event => {
    console.log('sword success!');
    Move.selectedMoveType = 'attack';
    const myAttackCounter = document.querySelector('span.my-attack-counter');
    currentSelectedInventory = Inventory.all['myAttack'];
});

document.querySelector('div.moves-placeholder').addEventListener('click', async event => {
    let target = event.target;
    console.log('selectedMoveType', Move.selectedMoveType);
    if (target.tagName === 'DIV' && Move.selectedMoveType && target.classList.contains('mv-placeholder')) {
        let bodyPartType;
        if (target.classList.contains('head') ) {
            console.log('hitting head');
            bodyPartType = 'head';

        } else if (target.classList.contains('body')) {
            console.log('hitting body');
            bodyPartType = 'body';

        } else if (target.classList.contains('legs')) {
            console.log('hitting legs');
            bodyPartType = 'legs';

        }

        let currentMovePlaceholder = MovePlaceholder.all[bodyPartType];
        if (currentMovePlaceholder) {
            currentMovePlaceholder.bodyPartType = bodyPartType;
            currentMovePlaceholder.moveType = Move.selectedMoveType;
            currentMovePlaceholder.target = target;
        } else {
            MovePlaceholder.all[bodyPartType] = new MovePlaceholder(bodyPartType, Move.selectedMoveType, target);
            currentMovePlaceholder = MovePlaceholder.all[bodyPartType];
        }

        currentMovePlaceholder.check();
        console.log(currentMovePlaceholder);
        console.log('my moves object', Move.myMoves);
    }
});

/* 
    gameId: timestamp???
    Ready!
    read move info from DOM
    in memory
    
    give player time to wait before round starts

    
*/

