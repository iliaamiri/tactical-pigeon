// Components
import Life from "../components/Inventories/Life.js";
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Sunglasses from "../components/Pigeons/Sunglasses.js";
import ResultOverlay from '../components/ResultOverlay.js';
import Tally from "../components/Tallies/Tally.js";
import Timer from "../components/Play/Timer.js";
import ReplayButton from "../components/Play/ReplayButton.js";
import BackHomeButton from "../components/Play/BackHomeButton.js";
import DoneButton from "../components/DoneButton.js";

// Helpers
import Players from "./Players.js";
import Player from "./Player.js";
import Round from "./Round.js";

// Core and utils
import { playSound, sounds } from "../core/sounds.js";

import gameCache from "../storage/gameCache.js";
import Auth from "../auth/Auth.js";


class Game {
  gameId;

  gameResultEnum = ['loss', 'win', 'draw'];

  currentRound = new Round();

  gameModes = ["online", "offline"];
  gameMode = "offline";

  endResult = null;

  gameFinished = "false";

  constructor(gameId, gameMode = "offline") {
    this.gameId = gameId;
    this.gameMode = gameMode;
    Game.currentGame = this;
  }
  
  static findByGameFromCache() {
    const { playerMe, playerOpponent, gameStatus } = gameCache.fetch();

    // Check if cache data is corrupted
    if (!playerMe || !playerOpponent || gameStatus) {
      return null;
    }

    return { playerMe, playerOpponent, gameStatus };
  }

  initiateOnline(playerMe, playerOpponent, gameComplete, timeLeft) {
    // Player 1 (Me)
    let myUsername = Auth.displayName;
    let myAmmoInventories = playerMe.ammoInventories;
    let myLives = playerMe.lives.lives;
    let myMoveHistory = playerMe.moveHistory;

    // Player 2 (Opponent)
    let opponentUsername = playerOpponent.username;
    let opponentAmmoInventories = playerOpponent.ammoInventories;
    let opponentLives = playerOpponent.lives.lives;
    let opponentMoveHistory = playerOpponent.moveHistory;

    let movesHistories = [];

    for (let i = 0; i < myMoveHistory.length; i++) {
      movesHistories.push({
        player1: myMoveHistory[i],
        player2: opponentMoveHistory[i]
      });
    }


    // Initiating the players.
    Players.all.player1 = new Player(myUsername, {
      'blocks': AmmoInventory.all['block-left'],
      'attacks': AmmoInventory.all['attack-left']
    });
    Players.all.player2 = new Player(opponentUsername, {
      'blocks': AmmoInventory.all['opponentBlock'],
      'attacks': AmmoInventory.all['opponentAttack']
    });

    const leftUsernameBox = document.querySelector('div.my-username-div span.username-span');
    const introBannerUsernameSpan = document.querySelector('div.intro-page p.character span');

    if (leftUsernameBox) {
      leftUsernameBox.innerHTML = myUsername;
    }
    if (introBannerUsernameSpan) {
      introBannerUsernameSpan.innerHTML = myUsername;
    }

    // Initiating the tallies.
    Tally.all = {
      'player1': new Tally(document.querySelector('table.tally.my-tally'), Players.all.player1),
      'player2': new Tally(document.querySelector('table.tally.opponent-tally'), Players.all.player2)
    };
    Tally.all.player1.currentTallyColumnNumber = 2;
    Tally.all.player2.currentTallyColumnNumber = 1;

    if (movesHistories.length > 0) {
      this.currentRound.fillTheTalliesWithMoveHistory(movesHistories);
    }

    // Set the current round number
    this.currentRound.currentRoundNumber = myMoveHistory.length + 1;

    for (let i = 0; i < Life.all.myLife.counterRange[1] - myLives; i++) {
      Life.all.myLife.decreaseCounter();
    }
    for (let i = 0; i < Life.all.opponentLife.counterRange[1] - opponentLives; i++) {
      Life.all.opponentLife.decreaseCounter();
    }

    // Sync the ammo inventories
    if (myAmmoInventories) {
      Players.all.player1.ammoInventory.blocks.counter = myAmmoInventories.blockCount;
      Players.all.player1.ammoInventory.attacks.counter = myAmmoInventories.attackCount;
    }

    if (opponentAmmoInventories) {
      Players.all.player2.ammoInventory.blocks.counter = opponentAmmoInventories.blockCount;
      Players.all.player2.ammoInventory.attacks.counter = opponentAmmoInventories.attackCount;
    }

    if (this.currentRound.currentRoundNumber !== 1 || timeLeft) {
      Timer.all['myTimer'].counter = Math.floor(timeLeft / 1000);
    }
  }

  async gameOverDueToOpponentDisconnection() {
    DoneButton.hide();

    ReplayButton.show();
    // Show the back to Home button
    BackHomeButton.show();

    ResultOverlay.updateTitle('victory');

    // you get sunglasses
    Sunglasses.left.activate();

    // game win sound effect
    await playSound(sounds.winGame);
    // document.querySelector("#winGame").play()

    this.gameFinished = "true";
  }

  async gameOver() {
    // results tied to clicking the done button, results show faster than animation though
    // connect result calculation here
    // resultOverlay.classList.add('victory');
    let gameResult = this.calculateGameResults();
    console.log('game result', gameResult); // debug

    ReplayButton.show();
    // Show the back to Home button
    BackHomeButton.show();

    if (gameResult === 'win') {
      ResultOverlay.updateTitle('victory');

      // you get sunglasses
      Sunglasses.left.activate();

      // game win sound effect
      await playSound(sounds.winGame);
      // document.querySelector("#winGame").play()

    } else if (gameResult === 'loss') {
      ResultOverlay.updateTitle('defeat');


      // opponent gets sunglasses
      Sunglasses.right.activate();

      //game lose sound effect
      let bgMusic = document.querySelector("#bgMusic");
      bgMusic.src = "";

      let fork = document.querySelector("#attack-image");
      fork.onclick = function () {
      };

      let shield = document.querySelector("#shield-image");
      shield.onclick = function () {
      };

      let opponentShield = document.querySelector(".opponent-counter-box > img");
      opponentShield.onclick = function () {
      };

      let opponentFork = document.querySelector("div:nth-child(2) > div.col-sm-2.asset-padding.opponent-counter-box")
      opponentFork.onclick = function () {
      };

      await playSound(sounds.loseGame);
      // document.querySelector("#loseGame").play()
    } else {
      ResultOverlay.updateTitle('draw');

      await playSound(sounds.drawGame);
      // document.querySelector("#drawGame").play()
    }
    this.gameFinished = "true";
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

  resetGame() {
    // check if online or offline, if online, redirect to index
    if (this.gameMode === "online") {
      // return location.href = "/";
    }
    return location.reload();
  }

  static currentGame;
}

export default Game;