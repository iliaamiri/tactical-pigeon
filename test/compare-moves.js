function singleCompare(move1, move2) {
  if (move1 === 'a' && move2 === '') {
    return 'player 1 wins';
  } else if (move1 === '' && move2 === 'a') {
    return 'player 2 wins';
  } else {
    return 'nothing happened';
  }
}

module.exports = singleCompare;