import MovePlaceholder from './components/MovePlaceholder.js';
import Inventory from "./components/Inventory.js";
import Life from './components/Life.js';

// Helpers
import Players from "./helpers/Players.js";
import Player from "./helpers/Player.js";
import BotPlayer from "./helpers/BotPlayer.js";
import RoundMove from "./helpers/RoundMove.js";

// Initiating the players.
Players.all.player1 = new Player("AklBm4", "Me");
Players.all.player2 = new BotPlayer();

// Initiating the move placeholders.
MovePlaceholder.all = {
    'head': new MovePlaceholder('head'),
    'body': new MovePlaceholder('body'),
    'legs': new MovePlaceholder('legs')
};

let currentSelectedInventory;

const gameResultEnum = ['loss', 'win', 'draw'];

function singleCompare(move1, move2) {
    if (move1 === 'attack' && move2 === 'none') {
        return 1;
    } else if (move1 === 'none' && move2 === 'attack') {
        return 2;
    } else {
        return 0;
    }
}

function tripletCompare(moves) {
    let ones = moves.filter(number => number === 1).length;
    let twos = moves.filter(number => number === 2).length;

    if (ones > twos) {
        return 1;
    } else if (ones < twos) {
        return 2;
    } else {
        return 0;
    }
}



let roundCounter = 1; // easier to start at 1 to use in nth-child()
const roundCounterMax = 5; // 5 rounds per game

// simple timeout between rounds, no extra animations
function clearBoardForNewRound() {

        
        //MovePlaceholder.checked = false;

        // -- To avoid repeating ourselves a little bit here, we can put this logic inside of a static method in MovePlaceholder class
        // MovePlaceholder.all = {
        //     'head': new MovePlaceholder('head'),
        //     'body': new MovePlaceholder('body'),
        //     'legs': new MovePlaceholder('legs')
        // };

        // Resetting/Re-initializing the MovePlaceholders
        MovePlaceholder.resetAll();

        //Move.myMoves = {
            //head: null,
            //body: null,
            //legs: null
        //};
        //Move.selectedMoveType = null;
        Players.all.player1.resetMoves();
        RoundMove.selectedMoveType = 'none';

        //console.log('MovePlaceholder', MovePlaceholder.all);


        document.querySelectorAll('div.mv-placeholder').forEach((element) => {
            element.classList.remove('filled-block');
            element.classList.remove('filled-attack');
        });

        document.querySelectorAll('.pop-out-animation').forEach((element) => {
            element.classList.add('pop-in-animation');
            element.classList.remove('pop-out-animation');
        });

        const leftPigeon = document.querySelector('div.pigeons-container img.pigeon-left');
        //console.log('left pigeon', leftPigeon);
        leftPigeon.classList.add('picking-move-animation');
        leftPigeon.classList.remove('revert-pigeon-pick-move');

        changeRoundTitle();

        document.querySelectorAll('.hide-animation').forEach(element => {
            element.classList.add('show-animation');
            element.classList.remove('hide-animation');
        });

};




function calculateGameResults() {
    console.log('calculating game results...');
    if (Life.all.myLife.counter > Life.all.opponentLife.counter) {
        //console.log('my lives', Life.all.myLife.counter);
        //console.log('opponent lives', Life.all.opponentLife.counter);
        return 'win';
    } else if (Life.all.myLife.counter < Life.all.opponentLife.counter) {
        //console.log('my lives', Life.all.myLife.counter);
        //console.log('opponent lives', Life.all.opponentLife.counter);
        return 'lose';
    }

    // if there's a draw, one can win by inventory counts
    let leftPlayerTotalInventory = Inventory.all['attack-left'].counter + Inventory.all['block-left'].counter;
    let rightPlayerTotalInventory = Inventory.all.opponentAttack.counter + Inventory.all.opponentBlock.counter;
    if (leftPlayerTotalInventory > rightPlayerTotalInventory) {
        /* console.log('my lives', Life.all.myLife.counter);
        console.log('opponent lives', Life.all.opponentLife.counter);
        console.log('my total inventory', leftPlayerTotalInventory);
        console.log('opponent total inventory', rightPlayerTotalInventory); */
        return 'win';
    } else if (leftPlayerTotalInventory > rightPlayerTotalInventory) {
        /* console.log('my lives', Life.all.myLife.counter);
        console.log('opponent lives', Life.all.opponentLife.counter);
        console.log('my total inventory', leftPlayerTotalInventory);
        console.log('opponent total inventory', rightPlayerTotalInventory); */
        return 'draw';
    }

    // if lives and inventories are exactly equal,
    return 'draw';
};




const roundTitle = document.querySelector('div.round-title');

function changeRoundTitle() {
    roundTitle.innerHTML = `<span>Round ${roundCounter}</span>`;
};

changeRoundTitle();


document.querySelector('body').addEventListener('click', async event => {
    event.preventDefault();
});

document.querySelector('div.done').addEventListener('click', async event => {

    //console.log("HERE");

    let myTallyColumn = document.querySelectorAll(`table.tally.my-tally td:nth-child(${roundCounter})`);
    //console.log('my column', myTallyColumn);
    //myTallyColumn.forEach((td, index) => {
        //let moveComponent = Object.values(Move.myMoves)[index];

    // Generating the Bot player's moves.
    const opponentMove = Players.all.player2.generateRandomMoves();

    //let myTallyFirstColumn = document.querySelectorAll('table.tally.my-tally td:first-child');

    myTallyColumn.forEach((td, index) => {
        let moveComponent = Object.values(Players.all.player1.moves.toJSON())[index];

        if (moveComponent === 'attack') {
            td.classList.add('cell-attacked');
        } else if (moveComponent === 'block') {
            td.classList.add('cell-blocked');
        }

    });

    let opponentTallyColumn = document.querySelectorAll(`table.tally.opponent-tally td:nth-child(${roundCounter})`);
    //console.log('opponent', opponentTallyColumn);
    opponentTallyColumn.forEach((td, index) => {
        let moveComponent = Object.values(opponentMove)[index];
        if (moveComponent === 'attack') {
            td.classList.add('cell-attacked');
        } else if (moveComponent === 'block') {
            td.classList.add('cell-blocked');
        }

    });

    let playerMoves = [];
    for (let index = 0; index < 3; index++) {
        let myMoveComponent = Object.values(Players.all.player1.moves.toJSON())[index];
        let opponentMoveComponent = Object.values(opponentMove)[index];
        playerMoves.push(singleCompare(myMoveComponent, opponentMoveComponent));
    }

    //console.log('playermoves', playerMoves);

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
        //console.log('element', element);
        element.classList.add('hide-animation');
        element.classList.remove('show-animation');
    });

    document.querySelectorAll('.pop-in-animation').forEach(element => {
        //console.log('element', element);
        element.classList.add('pop-out-animation');
        element.classList.remove('pop-in-animation');
    });

    let pigeon = document.querySelector('div.pigeons-container img.pigeon-left.picking-move-animation');
    pigeon.classList.add('revert-pigeon-pick-move');
    pigeon.classList.remove('picking-move-animation');
    document.getElementById("attack-image").setAttribute("src","/assets/img/GUI-controls/MainControls/attackfork-1.png")
    document.getElementById("shield-image").setAttribute("src","/assets/img/GUI-controls/MainControls/vikingshield-1.png")
    //console.log('*** round finished ***');
    console.log('life.all', Life.all);
    if (roundCounter < roundCounterMax && Life.all.myLife.counter > 0 && Life.all.opponentLife.counter > 0) {
        setTimeout(() => {
            roundCounter++;
            clearBoardForNewRound();
        }, 2000);
    } else {
        setTimeout(() => {
            //clearBoardForNewRound();
            window.alert(calculateGameResults());
            setTimeout(() => {
                window.alert("Thank you for playing! Refresh the page to play again!");
            }, 500);
        }, 2000);
        
        
        
        
    }

});

document.querySelector('img.my-shield').addEventListener('click', async event => {
    //console.log('shield selector hit!');
    RoundMove.selectedMoveType = 'block';
    //console.log('selected move type', RoundMove.selectedMoveType);
    const myBlockCounter = document.querySelector('span.my-block-counter');
    document.getElementById("shield-image").setAttribute("src","/assets/img/GUI-controls/MainControls/PressedShield.png");
    document.getElementById("attack-image").setAttribute("src","/assets/img/GUI-controls/MainControls/attackfork-1.png");
    currentSelectedInventory = Inventory.all['block-left'];
});

document.querySelector('img.my-attack').addEventListener('click', async event => {
    //console.log('sword selector hit!');
    RoundMove.selectedMoveType = 'attack';
    //console.log('selected move type', RoundMove.selectedMoveType);
    const myAttackCounter = document.querySelector('span.my-attack-counter');
    document.getElementById("attack-image").setAttribute("src","/assets/img/GUI-controls/MainControls/PressedFork.png");
    document.getElementById("shield-image").setAttribute("src","/assets/img/GUI-controls/MainControls/vikingshield-1.png");
    currentSelectedInventory = Inventory.all['attack-left'];
});

document.querySelector('div.moves-placeholder').addEventListener('click', async event => {
    let target = event.target;
    //console.log('selectedMoveType', RoundMove.selectedMoveType);
    //console.log('target', target);

    if (target.tagName === 'DIV' && (RoundMove.selectedMoveType !== 'none') && target.classList.contains('mv-placeholder')) {
        let bodyPartType;
        //console.log('hello!');
        if (target.classList.contains('head')) {
            //console.log('hitting head');
            bodyPartType = 'head';

        } else if (target.classList.contains('body')) {
            //console.log('hitting body');
            bodyPartType = 'body';

        } else if (target.classList.contains('legs')) {
            //console.log('hitting legs');
            bodyPartType = 'legs';
        }

        let currentMovePlaceholder = MovePlaceholder.all[bodyPartType];
        currentMovePlaceholder.bodyPartType = bodyPartType;
        currentMovePlaceholder.moveType = RoundMove.selectedMoveType;

        // -- We don't need this anymore, because we are already giving this to the instance when we initialize it (See MovePlaceholder.js constructor function).
        //currentMovePlaceholder.target = target;
        currentMovePlaceholder.check();

        //console.log('currentMovePlaceholder', currentMovePlaceholder);
        //console.log('my moves object', Players.all.player1.moves);
    }
});

/* 
    gameId: timestamp???
    Ready!
    read move info from DOM
    in memory
    
    give player time to wait before round starts

    
*/

