function tripletCompare(moves) {
  let ones = moves.filter(number => number === 1).length;
  let twos = moves.filter(number => number === 2).length;

  if (ones > twos) {
<<<<<<< HEAD:app/io/helpers/tripleCompare.js
    return 1; // player 1 got more successful attacks
  } else if (ones < twos) {
    return 2; // player 2 got more successful attacks
=======
    return 1;
  } else if (ones < twos) {
    return 2;
>>>>>>> team-multiplayer:public/assets/js/helpers/tripleCompare.js
  } else {
    return 0;
  }
};

module.exports = tripletCompare;