import Move from './classes/Move.js';
import MovePlaceholder from './classes/MovePlaceholder.js';
import Inventory from "./classes/Inventory.js";
import Life from './classes/Life.js';

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
        console.log()
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
    };

  console.log('opponentMove', opponentMove);




let roundCounter = 1; // easier to start at 1 to use in nth-child()
const roundCounterMax = 5; // 5 rounds per game

// simple timeout between rounds, no extra animations
function clearBoardForNewRound() {
    if (roundCounter < roundCounterMax) {
        
    }
    setTimeout(() => {
        MovePlaceholder.checked = false;
        MovePlaceholder.all = {};

        Move.myMoves = {
            head: null,
            body: null,
            legs: null
        };
        Move.selectedMoveType = null;



        document.querySelectorAll('div.mv-placeholder').forEach((element) => {
            element.classList.remove('filled-block');
            element.classList.remove('filled-attack');
        })

        const leftPigeon = document.querySelector('div.pigeons-container img.pigeon-left');
        console.log('left pigeon', leftPigeon);
        leftPigeon.classList.add('picking-move-animation');
        leftPigeon.classList.remove('revert-pigeon-pick-move');

        document.querySelectorAll('.hide-animation').forEach(element => {
            element.classList.add('show-animation');
            element.classList.remove('hide-animation');
        });
    }, 2000);
};




document.querySelector('body').addEventListener('click', async event => {
    event.preventDefault();
});

document.querySelector('div.done').addEventListener('click', async event => {
    console.log("HERE");

    let myTallyColumn = document.querySelectorAll(`table.tally.my-tally td:nth-child(${roundCounter})`);
    console.log('my column', myTallyColumn);
    myTallyColumn.forEach((td, index) => {
        let moveComponent = Object.values(Move.myMoves)[index];
        if (moveComponent === 'attack') {
            td.classList.add('cell-attacked');
        } else if (moveComponent === 'block') {
            td.classList.add('cell-blocked');
        }
        
    });

    let opponentTallyColumn = document.querySelectorAll(`table.tally.opponent-tally td:nth-child(${roundCounter})`);
    console.log('opponent', opponentTallyColumn);
    opponentTallyColumn.forEach((td, index) => {
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
        myTallyColumn.forEach(td => {
            td.classList.add('round-won');
        });
        opponentTallyColumn.forEach(td => {
            td.classList.add('round-defeat');
        });
        Life.all.opponentLife.decreaseCounter();
    } else if (roundResult === 2) {
        myTallyColumn.forEach(td => {
            td.classList.add('round-defeat');
        });
        opponentTallyColumn.forEach(td => {
            td.classList.add('round-won');
        });
        Life.all.myLife.decreaseCounter();
    } else {
        myTallyColumn.forEach(td => {
            td.classList.add('round-draw');
        });
        opponentTallyColumn.forEach(td => {
            td.classList.add('round-draw');
        });
    }
    
    document.querySelectorAll('.show-animation').forEach(element => {
        console.log('element',element);
        element.classList.add('hide-animation');
        element.classList.remove('show-animation');
    });

    let pigeon = document.querySelector('div.pigeons-container img.pigeon-left.picking-move-animation');
    pigeon.classList.add('revert-pigeon-pick-move');
    pigeon.classList.remove('picking-move-animation');

    if (roundCounter < roundCounterMax) {
        clearBoardForNewRound();
        roundCounter++;
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
        console.log('currentMovePlaceholder', currentMovePlaceholder);
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

