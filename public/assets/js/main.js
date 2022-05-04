// Importing the init.js and calling the function BEFORE EVERYTHING.
import init from "./init.js";
init();

// Component classes
import MovePlaceholder from './components/MovePlaceholder.js';
// import Inventory from "./components/Inventory.js";
import Life from './components/Life.js';
import Timer from './components/Timer.js';
import AmmoIcon from "./components/AmmoIcon.js";

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

// We need to have this DOM element for enabling/disabling it later on.
const doneButton = document.querySelector('div.done');

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
        //console.log('left pigeon', leftPigeon);
        leftPigeon.classList.add('picking-move-animation');
        leftPigeon.classList.remove('revert-pigeon-pick-move');

        changeRoundTitle();

        document.querySelectorAll('.hide-animation').forEach(element => {
            element.classList.add('show-animation');
            element.classList.remove('hide-animation');
        });
  
   // Enabling everything back for the next new round
        doneButton.enableClick(); // enabling done button

        Object.values(AmmoIcon.all)
            .map(ammoIconComponent => ammoIconComponent.iconElement.enableClick()); // enabling inventory ammo images/buttons.

        Object.values(MovePlaceholder.all)
            .map(movePlaceholderComponent => movePlaceholderComponent.target.enableClick()); // enabling the move placeholders

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


// Wrapping every click handler in one listener to be able handle the spam clicks easier.

document.querySelector('body').addEventListener('click', async event => {
    event.preventDefault();
    let target = event.target;

    // Checking if this element is not clickable
    let anyClosestCurrentlyNotClickable = target.closest('*.currently-not-clickable');

    if (anyClosestCurrentlyNotClickable) { // If it was not, just return here. Don't execute further. Stop. Die.
        return;
    }

  if (target.tagName === "DIV" && target.classList.contains("play-again")) {
      console.log("user wants to play again!")
    return location.reload()

    // Do not delete this yet
    // let replayBtn = document.querySelector(".play-again")
    // replayBtn.classList.add('replay-out-animation');
    // replayBtn.classList.remove('replay-in-animation');

    // let resultOverlay = document.querySelector(".result-banner")
    // resultOverlay.classList.remove('victory');

    // // reset move picker
    // clearBoardForNewRound()

    // // reset tally board
    // let myTally = document.querySelectorAll(`table.tally.my-tally td`);
    // console.log('my empty tally', myTally);
    // myTally.forEach((td) => {
    //     td.classList.remove('cell-attacked');
    //     td.classList.remove('cell-blocked');
    //     td.classList.remove('round-won');
    //     td.classList.remove('round-draw');
    //     td.classList.remove('round-defeat');
    // });

    // let opponentTally = document.querySelectorAll(`table.tally.opponent-tally td`);
    // console.log('opponent empty tally', opponentTally);
    // opponentTally.forEach((td) => {
    //     td.classList.remove('cell-attacked');
    //     td.classList.remove('cell-blocked');
    //     td.classList.remove('round-won');
    //     td.classList.remove('round-draw');
    //     td.classList.remove('round-defeat');
    // });

    // // reset ammo
    // Inventory.all["block-left"].resetCounter();
    // Inventory.all["attack-left"].resetCounter();
    // Inventory.all["opponentBlock"].resetCounter();
    // Inventory.all["opponentAttack"].resetCounter();

    // // reset lives
    // Life.all['myLife'].resetCounter();
    // Life.all['opponentLife'].resetCounter();

    // // reset timer
  // windows reload 
  // or reset everything 
}
    /* ---- Done ---- */
    if (target.tagName === "DIV" && target.classList.contains('done')) {

        console.log("DONE CLICKED");

        // disabling buttons for a moment
        target.disableClick(); // disabling done button

        Object.values(AmmoIcon.all)
            .map(ammoIconComponent => ammoIconComponent.iconElement.disableClick()); // disabling inventory ammo images/buttons.

        Object.values(MovePlaceholder.all)
            .map(movePlaceholderComponent => movePlaceholderComponent.target.disableClick()); // disabling the move placeholders

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


    document.getElementById("attack-image").setAttribute("src","/assets/img/GUI-controls/MainControls/attackfork-1.png");
    document.getElementById("shield-image").setAttribute("src","/assets/img/GUI-controls/MainControls/vikingshield-1.png");
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
            }, 500);
        }, 2000);
    }

    /* ---- My Ammo ---- */
    if (target.tagName === "IMG" && target.classList.contains('my-shield')) {
        console.log('shield selector hit!');

        // Here, we could move these logics to AmmoIcon class .click() method. And then just calling it here.
        // like this: (this currently wont work though. don't uncomment these).
        // AmmoIcon.all.player1_shield.click();
        // AmmoIcon.all.player1_attack.unclick();

        RoundMove.selectedMoveType = 'block';
        // const myBlockCounter = document.querySelector('span.my-block-counter');
        document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedShield.png")
        document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/attackfork-1.png")
        // currentSelectedInventory = Inventory.all['block-left'];
    }
    if (target.tagName === "IMG" && target.classList.contains('my-attack')) {
        console.log('sword selector hit!');

        // Here, we could move these logics to AmmoIcon class .click() method. And then just calling it here.
        // like this: (this currently wont work though. don't uncomment these).
        // AmmoIcon.all.player1_attack.click();
        // AmmoIcon.all.player1_shield.unclick();

        RoundMove.selectedMoveType = 'attack';
        // const myAttackCounter = document.querySelector('span.my-attack-counter');
        document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedFork.png")
        document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png")
        // currentSelectedInventory = Inventory.all['attack-left'];
    }

    /* ---- Moves Placeholders ---- */
    let movesPlaceholder = target.closest('div.moves-placeholder');
    if (movesPlaceholder &&
        target.tagName === 'DIV' &&
        RoundMove.selectedMoveType !== 'none' &&
        target.classList.contains('mv-placeholder')
    ) {
        console.log('selectedMoveType', RoundMove.selectedMoveType);
        let bodyPartType;
        //console.log('hello!');
        if (target.classList.contains('head')) {
            bodyPartType = 'head';
        } else if (target.classList.contains('body')) {
            bodyPartType = 'body';
        } else if (target.classList.contains('legs')) {
            bodyPartType = 'legs';
        }
        console.log(`hitting ${bodyPartType}`);

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

