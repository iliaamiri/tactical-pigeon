import Life from "../components/Inventories/Life.js";
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Sunglasses from "../components/Pigeons/Sunglasses.js";

import Players from "./Players.js";
import {playSound, sounds} from "../core/sounds.js";

class Game {
    gameId;

    gameResultEnum = ['loss', 'win', 'draw'];

    endResult = null;

    constructor(gameId) {
        this.gameId = gameId;
        Game.currentGame = this;
    }

    async gameOver() {
        // results tied to clicking the done button, results show faster than animation though
        // connect result calculation here
        // resultOverlay.classList.add('victory');
        let gameResult = this.calculateGameResults();
        console.log('game result', gameResult);
        if (gameResult === 'win') {
            ResultOverlay.updateTitle('victory');

            // you get sunglasses
            Sunglasses.left.activate();
            // document.querySelector(".sunglasses-left").classList.remove("d-none")
            // document.querySelector(".sunglasses-left").classList.add("animate__backInDown")

            // game win sound effect
            await playSound(sounds.winGame);
            // document.querySelector("#winGame").play()

        } else if (gameResult === 'loss') {
            ResultOverlay.updateTitle('defeat');

            // opponent gets sunglasses
            Sunglasses.right.activate();
            // document.querySelector(".sunglasses-right").classList.remove("d-none")
            // document.querySelector(".sunglasses-right").classList.add("animate__backInDown")


            //game lose sound effect
            let bgMusic = document.querySelector("#bgMusic")
            bgMusic.src = "";

            let fork = document.querySelector("#attack-image")
            fork.onclick = function () {
            }

            let shield = document.querySelector("#shield-image")
            shield.onclick = function () {
            }
            let opponentShield = document.querySelector(".opponent-counter-box > img")
            opponentShield.onclick = function () {
            }

            let opponentFork = document.querySelector("div:nth-child(2) > div.col-sm-2.asset-padding.opponent-counter-box")
            opponentFork.onclick = function () {
            }

            await playSound(sounds.loseGame);
            // document.querySelector("#loseGame").play()
        } else {
            ResultOverlay.element.activate('draw');

            await playSound(sounds.drawGame);
            // document.querySelector("#drawGame").play()
        }
    }

    calculateGameResults() {
        console.log('calculating game results...');
        if (Life.all.myLife.counter > Life.all.opponentLife.counter) {
            return this.gameResultEnum[1]; // win
        } else if (Life.all.myLife.counter < Life.all.opponentLife.counter) {
            return this.gameResultEnum[0]; // loss
        }

        // if there's a draw, one can win by inventory counts
        let leftPlayerTotalInventory = AmmoInventory.getTotalInventory(Players.all.player1);
        let rightPlayerTotalInventory = AmmoInventory.getTotalInventory(Players.all.player2);

        if (leftPlayerTotalInventory > rightPlayerTotalInventory) {
            return this.gameResultEnum[1]; // win
        } else if (leftPlayerTotalInventory < rightPlayerTotalInventory) {
            return this.gameResultEnum[0]; // loss
        }

        // if lives and inventories are exactly equal,
        return this.gameResultEnum[2]; // draw
    }

    static currentGame;
}

export default Game;