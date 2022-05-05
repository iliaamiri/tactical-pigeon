// Importing the init.js and calling the function BEFORE EVERYTHING.
import init from "./init.js";
init();

// Component classes
import MovePlaceholder from './components/MovePlaceholder.js';
// import Inventory from "./components/Inventory.js";
import Life from './components/Life.js';
import Timer from './components/Timer.js';
import AmmoIcon from "./components/AmmoIcon.js";
import Rounds from './components/Rounds.js';

// Helpers
import Players from "./helpers/Players.js";
import Player from "./helpers/Player.js";
import BotPlayer from "./helpers/BotPlayer.js";
import RoundMove from "./helpers/RoundMove.js";
import singleCompare from "./helpers/singleCompare.js";
import tripletCompare from "./helpers/tripleCompare.js";
import clearBoardForNewRound from "./helpers/clearBoardForNewRound.js";
import calculateGameResults from "./helpers/calculateGameResults.js";
import changeRoundTitle from "./helpers/changeRoundTitle.js";
import resetGame from "./helpers/resetGame.js";
import restingMode from "./helpers/restingMode.js";
import roundCountdown from "./helpers/roundCountdown.js";


//Initiating the game.
Rounds.all.game1 =  new Rounds()

// Initiating the players.
Players.all.player1 = new Player("AklBm4", "Me");
Players.all.player2 = new BotPlayer();

// Initiating the move placeholders.
MovePlaceholder.all = {
    'head': new MovePlaceholder('head'),
    'body': new MovePlaceholder('body'),
    'legs': new MovePlaceholder('legs')
};

// let currentSelectedInventory;
const gameResultEnum = ['loss', 'win', 'draw'];

// let roundCounter = Rounds.all['game1'].counter; // easier to start at 1 to use in nth-child()
// const roundCounterMax = Rounds.all['game1'].counterRange[1]; // 5 rounds per game

changeRoundTitle(Rounds.all['game1'].counter);

document.querySelector("div.countdown-overlay").classList.remove("d-none");
roundCountdown();

// First round start timer
setTimeout(() => {
    document.querySelector("div.countdown-overlay").classList.add("d-none");
    Timer.all['myTimer'].startCounter();
    document.querySelector(".play-again").classList.add("d-none")
    document.querySelector('.move-picker-overlay').classList.add('show-animation');
    document.querySelector('.moves-placeholder').classList.add('pop-in-animation');
    document.querySelector('.done').classList.add('pop-in-animation');
}, 5000)



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
        resetGame()
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

        Timer.all['myTimer'].resetCounter();

        let myTallyColumn = document.querySelectorAll(`table.tally.my-tally td:nth-child(${Rounds.all['game1'].counter})`);
        console.log('my column', myTallyColumn);
        //myTallyColumn.forEach((td, index) => {
        //let moveComponent = Object.values(Move.myMoves)[index];

        // Generating the Bot player's moves.
        const opponentMove = Players.all.player2.generateRandomMoves();
        console.log(opponentMove)

        //let myTallyFirstColumn = document.querySelectorAll('table.tally.my-tally td:first-child');
        myTallyColumn.forEach((td, index) => {
            let moveComponent = Object.values(Players.all.player1.moves.toJSON())[index];

            if (moveComponent === 'attack') {
                td.classList.add('cell-attacked');
            } else if (moveComponent === 'block') {
                td.classList.add('cell-blocked');
            }

        });

        let opponentTallyColumn = document.querySelectorAll(`table.tally.opponent-tally td:nth-child(${Rounds.all['game1'].counter})`);
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

        // console.log('playermoves', playerMoves);
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

        restingMode()
        
        console.log('life.all', Life.all);
        if (Rounds.all['game1'].counter < Rounds.all['game1'].counterRange[1] && Life.all.myLife.counter > 0 && Life.all.opponentLife.counter > 0) {
            setTimeout(() => {
                document.querySelector("div.countdown-overlay").classList.remove("d-none");
                roundCountdown();
                setTimeout(() => {
                    // Timer.all['myTimer'].startCounter();
                    document.querySelector("div.countdown-overlay").classList.add("d-none");
                    Rounds.all['game1'].increaseCounter();
                    // console.log(Rounds.all['game1'].counter)
                    clearBoardForNewRound(Rounds.all['game1'].counter);
                }, 4000);
            }, 5000)

        } else {
            // results tied to clicking the done button, results show faster than animation though
            // connect result calculation here
            let resultOverlay = document.querySelector(".result-banner");
            resultOverlay.classList.add('victory');
            let gameResult = calculateGameResults();
            console.log('game result', gameResult);
            if (gameResult === 'win') {
                resultOverlay.classList.add('victory');
            } else if (gameResult === 'loss') {
                resultOverlay.classList.add('defeat');
            } else {
                resultOverlay.classList.add('draw');
            }
            // resultOverlay.classList.add('draw');
            // resultOverlay.classList.add('defeat');
            // console.log(resultOverlay);
            let replayBtn = document.querySelector(".play-again");
            replayBtn.classList.add('replay-in-animation');
            replayBtn.classList.remove('replay-out-animation');
            replayBtn.classList.remove('d-none');

            document.querySelector('div.done').classList.add('d-none');
            document.querySelector('div.moves-placeholder').classList.add('d-none');
            Rounds.all['game1'].resetCounter();
        }
    }

    /* ---- My Ammo ---- */
    if (target.tagName === "IMG" && target.classList.contains('my-shield')) {
        //console.log('shield selector hit!');

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
        // console.log('sword selector hit!');

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
        // console.log(`hitting ${bodyPartType}`);
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
