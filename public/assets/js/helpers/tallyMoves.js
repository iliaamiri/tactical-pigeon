// Component classes
import MovePlaceholder from '../components/MovePlaceholder.js';
// import Inventory from "./components/Inventory.js";
import Life from '../components/Life.js';
import Timer from '../components/Timer.js';
import AmmoIcon from "../components/AmmoIcon.js";
import Rounds from '../components/Rounds.js';

// Helpers
import Players from "../helpers/Players.js";
import Player from "../helpers/Player.js";
import BotPlayer from "../helpers/BotPlayer.js";
import RoundMove from "../helpers/RoundMove.js";
import singleCompare from "../helpers/singleCompare.js";
import tripletCompare from "../helpers/tripleCompare.js";
import clearBoardForNewRound from "../helpers/clearBoardForNewRound.js";
import calculateGameResults from "../helpers/calculateGameResults.js";
import changeRoundTitle from "../helpers/changeRoundTitle.js";
import resetGame from "../helpers/resetGame.js";
import restingMode from "../helpers/restingMode.js";
import roundCountdown from "../helpers/roundCountdown.js";

function tallyMoves() {
  let myTallyColumn = document.querySelectorAll(`table.tally.my-tally td:nth-child(${Rounds.all['game1'].counter})`);
        // console.log('my column', myTallyColumn);
        //myTallyColumn.forEach((td, index) => {
        //let moveComponent = Object.values(Move.myMoves)[index];
        //let myTallyFirstColumn = document.querySelectorAll('table.tally.my-tally td:first-child');
        myTallyColumn.forEach((td, index) => {
            let moveComponent = Object.values(Players.all.player1.moves.toJSON())[index];

            if (moveComponent === 'attack') {
                td.classList.add('cell-attacked');
            } else if (moveComponent === 'block') {
                td.classList.add('cell-blocked');
            }

        });

        // Generating the Bot player's moves.
        const opponentMove = Players.all.player2.generateRandomMoves();
        // console.log(opponentMove);
        let opponentTallyColumn = document.querySelectorAll(`table.tally.opponent-tally td:nth-child(${Rounds.all['game1'].counter})`);
        // console.log('opponent', opponentTallyColumn);
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
}

export default tallyMoves;