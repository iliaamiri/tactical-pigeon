// Component classes
import MovePlaceholder from '../components/MovePlaceholder.js';
import Life from '../components/Life.js';
import Timer from '../components/Timer.js';
import AmmoIcon from "../components/AmmoIcon.js";
import Rounds from '../components/Rounds.js';

// Helpers
import Players from "../helpers/Players.js";
import singleCompare from "../helpers/singleCompare.js";
import tripletCompare from "../helpers/tripleCompare.js";
import clearBoardForNewRound from "../helpers/clearBoardForNewRound.js";
import calculateGameResults from "../helpers/calculateGameResults.js";
import restingMode from "../helpers/restingMode.js";
import roundCountdown from "../helpers/roundCountdown.js";


function donePressed() {
    console.log("DONE AUTO CLICKED");
    // // disabling buttons for a moment
    // doneBtn.disableClick(); // disabling done button
    // Object.values(AmmoIcon.all)
    //     .map(ammoIconComponent => ammoIconComponent.iconElement.disableClick()); // disabling inventory ammo images/buttons.
    
    // Object.values(MovePlaceholder.all)
    //     .map(movePlaceholderComponent => movePlaceholderComponent.doneBtn.disableClick()); // disabling the move placeholders
    
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
    
    restingMode();
    
    console.log('life.all', Life.all);
    if (Rounds.all['game1'].counter < Rounds.all['game1'].counterRange[1] && Life.all.myLife.counter > 0 && Life.all.opponentLife.counter > 0) {
    
        setTimeout(async () => {
            document.querySelector("div.countdown-overlay").classList.remove("d-none");
            // document.querySelector("div.countdown-overlay").classList.add("transparent");
            await roundCountdown();
            // Timer.all['myTimer'].startCounter();
            document.querySelector("div.countdown-overlay").classList.add("d-none");
            // document.querySelector("div.countdown-overlay").classList.remove("transparent");
            Rounds.all['game1'].increaseCounter();
            // console.log(Rounds.all['game1'].counter)
            setTimeout(() => {
                clearBoardForNewRound(Rounds.all['game1'].counter);
            }, 800);
    
            /* setTimeout(() => {
                
            }, 4000); */
        }, 1600);
    
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

export default donePressed;