import Life from '../components/Life.js';

function calculateGameResults() {
    const gameResultEnum = ['loss', 'win', 'draw'];

    console.log('calculating game results...');
    if (Life.all.myLife.counter > Life.all.opponentLife.counter) {
        //console.log('my lives', Life.all.myLife.counter);
        //console.log('opponent lives', Life.all.opponentLife.counter);
        return gameResultEnum[1];
    } else if (Life.all.myLife.counter < Life.all.opponentLife.counter) {
        //console.log('my lives', Life.all.myLife.counter);
        //console.log('opponent lives', Life.all.opponentLife.counter);
        return gameResultEnum[0];
    }

    // if there's a draw, one can win by inventory counts
    let leftPlayerTotalInventory = Inventory.all['attack-left'].counter + Inventory.all['block-left'].counter;
    let rightPlayerTotalInventory = Inventory.all.opponentAttack.counter + Inventory.all.opponentBlock.counter;
    if (leftPlayerTotalInventory > rightPlayerTotalInventory) {
        /* console.log('my lives', Life.all.myLife.counter);
        console.log('opponent lives', Life.all.opponentLife.counter);
        console.log('my total inventory', leftPlayerTotalInventory);
        console.log('opponent total inventory', rightPlayerTotalInventory); */
        return gameResultEnum[1];
    } else if (leftPlayerTotalInventory < rightPlayerTotalInventory) {
        /* console.log('my lives', Life.all.myLife.counter);
        console.log('opponent lives', Life.all.opponentLife.counter);
        console.log('my total inventory', leftPlayerTotalInventory);
        console.log('opponent total inventory', rightPlayerTotalInventory); */
        return gameResultEnum[0];
    }

    // if lives and inventories are exactly equal,
    return gameResultEnum[2];
};

export default calculateGameResults;