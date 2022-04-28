let selectedMoveType;

let myMoves = {
    head: null,
    body: null,
    legs: null
};

const moveTypeEnum = ['attack', 'block'];

const gameResultEnum = ['loss', 'win', 'draw'];

class Inventory {
    #counter = 4;
    type;
    counterRange = [0, 4];

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
};

class MovePlaceholder {
    checked = false;

    bodyPartType;
    moveType;
    target;
    

    constructor(selectedMoveType, target) {
        this.moveType = selectedMoveType;
        this.target = target;
        myMoves[bodyPartType] = selectedMoveType;
    }

    set moveType(newMoveType) {
        if (moveTypeEnum.includes(newMoveType)) {
            this.moveType = newMoveType;
        }
    }

    check() {
        this.checked = !this.checked;

        if (this.checked) {
            /* do stuff as if it's ON */
            this.target.classList.add(`filled-${this.moveType}`);

        } else {
            /* do stuff as if it's OFF */
            this.target.classList.remove(`filled-${this.moveType}`);

        }
    }

};


document.querySelector('body').addEventListener('click', async event => {
    event.preventDefault();
});

document.querySelector('img.my-shield').addEventListener('click', async event => {
    console.log('shield success!');
    selectedMoveType = 'block';
});

document.querySelector('img.my-attack').addEventListener('click', async event => {
    console.log('sword success!');
    selectedMoveType = 'attack';
});

document.querySelector('div.moves-placeholder').addEventListener('click', async event => {
    let target = event.target;
    console.log('selectedMoveType', selectedMoveType);
    if (target.tagName === 'DIV' && selectedMoveType) {

        let movePlaceholder = new MovePlaceholder(selectedMoveType, target);

        if (target.classList.contains('head') ) {
            console.log('head');
            movePlaceholder.bodyPartType = 'head';
        } else if (target.classList.contains('body')) {
            console.log('body');
            movePlaceholder.bodyPartType = 'body';
        } else if (target.classList.contains('legs')) {
            console.log('legs');
            movePlaceholder.bodyPartType = 'legs';
        }

        console.log('my moves object', myMoves)
    }
    //console.log(target, 'head');
});

/* 
    gameId: timestamp???
    Ready!
    read move info from DOM
    in memory
    
    give player time to wait before round starts

    
*/

