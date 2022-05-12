import Life from '../components/Inventories/Life.js';
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Players from './Players.js';

function calculateGameResults() {
  const gameResultEnum = ['loss', 'win', 'draw'];

  console.log('calculating game results...');
  if (Life.all.myLife.counter > Life.all.opponentLife.counter) {
    return gameResultEnum[1]; // win
  } else if (Life.all.myLife.counter < Life.all.opponentLife.counter) {
    return gameResultEnum[0]; // loss
  }

  // if there's a draw, one can win by inventory counts
  let leftPlayerTotalInventory = AmmoInventory.getTotalInventory(Players.all.player1);
  let rightPlayerTotalInventory = AmmoInventory.getTotalInventory(Players.all.player2);

  if (leftPlayerTotalInventory > rightPlayerTotalInventory) {
    return gameResultEnum[1]; // win
  } else if (leftPlayerTotalInventory < rightPlayerTotalInventory) {
    return gameResultEnum[0]; // loss
  }

  // if lives and inventories are exactly equal,
  return gameResultEnum[2]; // draw
};

export default calculateGameResults;