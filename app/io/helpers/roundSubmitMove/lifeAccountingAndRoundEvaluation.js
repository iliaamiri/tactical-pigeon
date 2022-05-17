const singleCompare = require("../singleCompare");
const tripleCompare = require("../tripleCompare");

function lifeAccountingAndRoundEvaluation(currentRound, otherPlayerId, thisPlayerMove, thisPlayer, otherPlayerMove, otherPlayer, foundGame) {
  // Life accounting
  // console.log('this players life', JSON.parse(JSON.stringify(thisPlayer.life))); // debug

  // console.log('otherPlayerMove', otherPlayerMove); // debug

  let checkedMovesArr = [];
  for (const key of Object.keys(thisPlayerMove.toJSON())) {
    checkedMovesArr.push(singleCompare(thisPlayerMove[key], otherPlayerMove[key]));
  }
  let roundResult = tripleCompare(checkedMovesArr);
  if (roundResult === 2) {
    thisPlayer.life.loseLife();
  }
  if (roundResult === 1) {
    otherPlayer.life.loseLife();
  }

  // console.log('this players life after processing', JSON.parse(JSON.stringify(thisPlayer.life)));

  if (thisPlayer.ammoInventory.getTotalInventory() === 0 // If the player had no ammo
    || otherPlayer.ammoInventory.getTotalInventory() === 0 // If the other player had no ammo
    || thisPlayer.life.lives === 0 // If this player had no lives
    || otherPlayer.life.lives === 0 // If the other player had not lives
    || currentRound === 5) // Or, if this was the last round
  {
    foundGame.gameComplete = true; // Mark the game as complete
  } else {
    console.log("NEXT ROUND:")
    foundGame.nextRound();
  }

  return otherPlayerMove;
}

module.exports = lifeAccountingAndRoundEvaluation;