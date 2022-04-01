function singleCompare(move1, move2) {
  if (move1 === 'a' && move2 === '') {
    return 'player 1 wins';
  }

  if (move1 === '' && move2 === 'a') {
    return 'player 2 wins';
  }

  if (move1 === 'b' && move2 === '') {
    return 'nothing happened';
  }

  if (move1 === '' && move2 === 'a') {
    return 'nothing happened';
  }

  if (move1 === 'a' && move2 === 'b') {
    return 'nothing happened';
  }

  if (move1 === 'b' && move2 === 'a') {
    return 'nothing happened';
  }

  if (move1 === '' && move2 === '') {
    return 'nothing happened';
  }

  if (move1 === 'a' && move2 === 'a') {
    return 'nothing happened';
  }

  if (move1 === 'b' && move2 === 'b') {
    return 'nothing happened';
  }
};

module.exports = singleCompare;