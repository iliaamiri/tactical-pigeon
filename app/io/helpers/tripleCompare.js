function tripletCompare(moves) {
  let ones = moves.filter(number => number === 1).length;
  let twos = moves.filter(number => number === 2).length;

  if (ones > twos) {
    return 1; // player 1 got more successful attacks
  } else if (ones < twos) {
    return 2; // player 2 got more successful attacks
  } else {
    return 0;
  }
}

module.exports = tripletCompare;