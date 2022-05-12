const singleCompare = require('./compare-moves');

describe('given two players', () => {

  describe('Given a single pair of moves', () => {

    test('when the first player attacks and the second player does nothing, singleCompare should return a win for the first player', () => {
      let result = singleCompare('a', '');
      expect(result).toBe('player 1 wins');
    });

    test('when the first player does nothing and the second playe attacks, singleCompare should return a win for the first player', () => {
      let result = singleCompare('', 'a');
      expect(result).toBe('player 2 wins');
    });

    test('when the first player blocks and the second player does nothing, singleCompare should say that nothing happened', () => {
      let result = singleCompare('b', '');
      expect(result).toBe('nothing happened');
    });

    test('when the first player does nothing and the second player blocks, singleCompare should say that nothing happened', () => {
      let result = singleCompare('b', '');
      expect(result).toBe('nothing happened');
    });

    test('when the first player attacks and the second player blocks, singleCompare should say that nothing happened', () => {
      let result = singleCompare('a', 'b');
      expect(result).toBe('nothing happened');
    });

    test('when the first player does nothing and the second player attacks, singleCompare should return a win for the first player', () => {
      let result = singleCompare('b', 'a');
      expect(result).toBe('nothing happened');
    });

    test('when the first player does nothing and the second player does nothing, singleCompare should say that nothing happened', () => {
      let result = singleCompare('', '');
      expect(result).toBe('nothing happened');
    });

    test('when the first player attacks and the second player attacks, singleCompare should say that nothing happened', () => {
      let result = singleCompare('a', 'a');
      expect(result).toBe('nothing happened');
    });

    test('when the first player blocks and the second player blocks, singleCompare should say that nothing happened', () => {
      let result = singleCompare('b', 'b');
      expect(result).toBe('nothing happened');
    });

  });

});

