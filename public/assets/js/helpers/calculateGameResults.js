import Life from '../components/Life.js';

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

export default calculateGameResults;