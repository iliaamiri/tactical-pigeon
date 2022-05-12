// Components
import Life from "../components/Inventories/Life.js";
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Sunglasses from "../components/Pigeons/Sunglasses.js";
import ResultOverlay from '../components/ResultOverlay.js';
import Tally from "../components/Tally.js";
import MovePlaceholder from "../components/MovePlaceholder.js";

// Helpers
import Players from "./Players.js";
import Player from "./Player.js";
import Round from "./Round.js";
import BotPlayer from "./BotPlayer.js";

// Core and utils
import {playSound, sounds} from "../core/sounds.js";
import LocalStorageCache from "../core/LocalStorageCache.js";


class Game {
  gameId;

  gameResultEnum = ['loss', 'win', 'draw'];

  currentRound = new Round();

  endResult = null;

  constructor(gameId) {
    this.gameId = gameId;
    Game.currentGame = this;
  }

  static findByGameId(gameId) {
    const {foundGame, players, movesHistory} = LocalStorageCache.fetch();

    // Check if cache data is corrupted
    if (!foundGame || !players || movesHistory) {
      return null;
    }

    this.initiateCache(gameId, foundGame, players, movesHistory);
  }

  static initiate(gameId, myUsername, opponentUsername) {
    // Initiating the players.
    Players.all.player1 = new Player(myUsername, {
      'blocks': AmmoInventory.all['block-left'],
      'attacks': AmmoInventory.all['attack-left']
    });
    Players.all.player1 = new Player(opponentUsername, {
      'blocks': AmmoInventory.all['block-left'],
      'attacks': AmmoInventory.all['attack-left']
    });

    // Initiating the tallies.
    Tally.all = {
      'player1': new Tally(document.querySelector('table.tally.my-tally'), Players.all.player1),
      'player2': new Tally(document.querySelector('table.tally.opponent-tally'), Players.all.player2)
    };
    Tally.all.player1.currentTallyColumnNumber = Game.currentGame.currentRound.currentRoundNumber + 1;
  }

  static initiateCache(gameId, foundGame, players, movesHistory) {
    let gameInstance = new Game(gameId);

    Players.all.player1 = new Player(players.player1.username, {
      'blocks': AmmoInventory.all['block-left'],
      'attacks': AmmoInventory.all['attack-left']
    });

    Players.all.player2 = new Player(players.player2.username, {
      'blocks': AmmoInventory.all['block-left'],
      'attacks': AmmoInventory.all['attack-left']
    });

    Players.all.player1.ammoInventory.blocks.counter = players.player1.ammoInventory.blocks.count;
    Players.all.player1.ammoInventory.attacks.counter = players.player1.ammoInventory.attacks.count;

    Players.all.player2.ammoInventory.blocks.counter = players.player2.ammoInventory.blocks.count;
    Players.all.player2.ammoInventory.attacks.counter = players.player2.ammoInventory.attacks.count;

    // Initiating the tallies.
    Tally.all = {
      'player1': new Tally(document.querySelector('table.tally.my-tally'), Players.all.player1),
      'player2': new Tally(document.querySelector('table.tally.opponent-tally'), Players.all.player2)
    };
    Tally.all.player1.currentTallyColumnNumber = Game.currentGame.currentRound.currentRoundNumber + 1;

    for (let i = 0; i < movesHistory.length; i++) {
      // calculate the rounds

      // re-fill the tallies
    }

    gameInstance.currentRound.currentRoundNumber = foundGame.currentRoundNumber;
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
      ResultOverlay.updateTitle('draw');

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

  resetGame() {
    return location.reload();

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

  static currentGame;
}

export default Game;