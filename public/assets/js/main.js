import Move from './classes/Move.js';
import MovePlaceholder from './classes/MovePlaceholder.js';
import Inventory from "./classes/Inventory.js";

let currentSelectedInventory;

const gameResultEnum = ['loss', 'win', 'draw'];


document.querySelector('body').addEventListener('click', async event => {
    event.preventDefault();
});

document.querySelector('button.done').addEventListener('click', async event => {
    console.log("HERE")
});

document.querySelector('img.my-shield').addEventListener('click', async event => {
    console.log('shield success!');
    Move.selectedMoveType = 'block';
    const myBlockCounter = document.querySelector('span.my-block-counter');
    currentSelectedInventory = Inventory.all['block'];
});

document.querySelector('img.my-attack').addEventListener('click', async event => {
    console.log('sword success!');
    Move.selectedMoveType = 'attack';
    const myAttackCounter = document.querySelector('span.my-attack-counter');
    currentSelectedInventory = Inventory.all['attack'];
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

