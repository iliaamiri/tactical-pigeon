import MovePlaceholder from './components/MovePlaceholder.js';
import Inventory from "./components/Inventory.js";
import Life from './components/Life.js';
import Timer from './components/Timer.js';

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

// Initiating Timer.
// let myTimerCounter = document.querySelector('span.time-nums');
console.log(Timer.all)

// Timer.all['myTimer'].resetCounter();
// Timer.all['myTimer'].startCounter();
// This is not working yet

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


//PHOENIX CHANGE THIS BACK BEFORE COMMIT
let roundCounter = 1; // easier to start at 1 to use in nth-child() 
const roundCounterMax = 5; // 5 rounds per game

// simple timeout between rounds, no extra animations
function clearBoardForNewRound() {
    setTimeout(() => {

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

        console.log('MovePlaceholder', MovePlaceholder.all);

        document.querySelector('div.done').classList.remove('d-none')
        document.querySelector('div.moves-placeholder').classList.remove('d-none')

        document.querySelectorAll('div.mv-placeholder').forEach((element) => {
            element.classList.remove('filled-block');
            element.classList.remove('filled-attack');
        });

        document.querySelectorAll('.pop-out-animation').forEach((element) => {
            element.classList.add('pop-in-animation');
            element.classList.remove('pop-out-animation');
        });

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

// Show each move after clicking done
document.querySelector('div.done').addEventListener('click', async event => {

    console.log("HERE");

    let myTallyColumn = document.querySelectorAll(`table.tally.my-tally td:nth-child(${roundCounter})`);
    console.log('my column', myTallyColumn);
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
    console.log('opponent', opponentTallyColumn);
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
        console.log('element', element);
        element.classList.add('hide-animation');
        element.classList.remove('show-animation');
    });

    document.querySelectorAll('.pop-in-animation').forEach(element => {
        console.log('element', element);
        element.classList.add('pop-out-animation');
        element.classList.remove('pop-in-animation');
    });

    let pigeon = document.querySelector('div.pigeons-container img.pigeon-left.picking-move-animation');

    pigeon.classList.add('revert-pigeon-pick-move');
    pigeon.classList.remove('picking-move-animation');

    document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/attackfork-1.png");
    document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png");

    if (roundCounter < roundCounterMax) {
        clearBoardForNewRound();
        roundCounter++;
    } else {
        // results tied to clicking the done button, results show faster than animation though
        // connect result calculation here

        let resultOverlay = document.querySelector(".result-banner");
        resultOverlay.classList.add('victory');
        // resultOverlay.classList.add('draw');
        // resultOverlay.classList.add('defeat');

        console.log(resultOverlay);

        let replayBtn = document.querySelector(".play-again");
        replayBtn.classList.add('replay-in-animation');
        replayBtn.classList.remove('replay-out-animation');

        document.querySelector('div.done').classList.add('d-none');
        document.querySelector('div.moves-placeholder').classList.add('d-none');

        roundCounter = 1;

        // window.alert("Thank you for playing! Refresh the page to play again!");
    }

});

document.querySelector(".play-again").addEventListener("click", async event => {
    console.log("user wants to play again!")

    let replayBtn = document.querySelector(".play-again")
    replayBtn.classList.add('replay-out-animation');
    replayBtn.classList.remove('replay-in-animation');

    let resultOverlay = document.querySelector(".result-banner")
    resultOverlay.classList.remove('victory');

    // reset move picker
    clearBoardForNewRound()

    // reset tally board
    let myTally = document.querySelectorAll(`table.tally.my-tally td`);
    console.log('my empty tally', myTally);
    myTally.forEach((td) => {
        td.classList.remove('cell-attacked');
        td.classList.remove('cell-blocked');
        td.classList.remove('round-won');
        td.classList.remove('round-draw');
        td.classList.remove('round-defeat');
    });

    let opponentTally = document.querySelectorAll(`table.tally.opponent-tally td`);
    console.log('opponent empty tally', opponentTally);
    opponentTally.forEach((td) => {
        td.classList.remove('cell-attacked');
        td.classList.remove('cell-blocked');
        td.classList.remove('round-won');
        td.classList.remove('round-draw');
        td.classList.remove('round-defeat');
    });

    // reset ammo
    Inventory.all["block-left"].resetCounter();
    Inventory.all["attack-left"].resetCounter();
    Inventory.all["opponentBlock"].resetCounter();
    Inventory.all["opponentAttack"].resetCounter();

    // reset lives
    Life.all['myLife'].resetCounter();
    Life.all['opponentLife'].resetCounter();

    // reset timer

})

document.querySelector('img.my-shield').addEventListener('click', async event => {
    console.log('shield selector hit!');
    RoundMove.selectedMoveType = 'block';
    const myBlockCounter = document.querySelector('span.my-block-counter');     // are we using this anymore?
    document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedShield.png")
    document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/attackfork-1.png")
    currentSelectedInventory = Inventory.all['block-left'];
});

document.querySelector('img.my-attack').addEventListener('click', async event => {
    console.log('sword selector hit!');
    RoundMove.selectedMoveType = 'attack';
    const myAttackCounter = document.querySelector('span.my-attack-counter');   // are we using this anymore?
    document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedFork.png")
    document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png")
    currentSelectedInventory = Inventory.all['attack-left'];
});

document.querySelector('div.moves-placeholder').addEventListener('click', async event => {
    let target = event.target;
    console.log('selectedMoveType', RoundMove.selectedMoveType);
    console.log(target)
    if (target.tagName === 'DIV' && (RoundMove.selectedMoveType !== 'none') && target.classList.contains('mv-placeholder')) {
        let bodyPartType;
        console.log("hi")
        if (target.classList.contains('head')) {
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
        currentMovePlaceholder.bodyPartType = bodyPartType;
        currentMovePlaceholder.moveType = RoundMove.selectedMoveType;

        // -- We don't need this anymore, because we are already giving this to the instance when we initialize it (See MovePlaceholder.js constructor function).
        //currentMovePlaceholder.target = target;
        currentMovePlaceholder.check();

        console.log('currentMovePlaceholder', currentMovePlaceholder);
        console.log('my moves object', Players.all.player1.moves);
    }
});

/* 
    gameId: timestamp???
    Ready!
    read move info from DOM
    in memory
    
    give player time to wait before round starts

    
*/

