function tripletCompare(moves) {
  let ones = moves.filter(number => number === 1).length;
  let twos = moves.filter(number => number === 2).length;

  if (ones > twos) {
    return 1;
  } else if (ones < twos) {
    return 2;
  } else {
    return 0;
  }
};

export default tripletCompare;