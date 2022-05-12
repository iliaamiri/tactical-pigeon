
function resetGame() {
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
  //   td.classList.remove('cell-attacked');
  //   td.classList.remove('cell-blocked');
  //   td.classList.remove('round-won');
  //   td.classList.remove('round-draw');
  //   td.classList.remove('round-defeat');
  // });

  // let opponentTally = document.querySelectorAll(`table.tally.opponent-tally td`);
  // console.log('opponent empty tally', opponentTally);
  // opponentTally.forEach((td) => {
  //   td.classList.remove('cell-attacked');
  //   td.classList.remove('cell-blocked');
  //   td.classList.remove('round-won');
  //   td.classList.remove('round-draw');
  //   td.classList.remove('round-defeat');
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
};

export default resetGame;