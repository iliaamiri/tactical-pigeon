function singleCompare(move1, move2) {
  if (move1 === 'attack' && move2 === 'none') {
    return 1;
  } else if (move1 === 'none' && move2 === 'attack') {
    return 2;
  } else {
    return 0;
  }
};

module.exports = singleCompare;