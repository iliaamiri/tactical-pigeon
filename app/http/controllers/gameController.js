const singleCompare = include("./test/compare-moves");

const GameController = {
  async submitGameMove(req, res) {
    try {
      console.log("api /games/submitMove post hit");
      const {move} = req.body;
      console.log("Move: ", move);
      const acceptableMovesEnums = ["attack", "block", "none"];
      const acceptableMoves = {
        "attack": "a",
        "block": "b",
        "none": ""
      };
      const results = {
        "player 1 wins": "won",
        "player 2 wins": "lost",
        "nothing happened": "draw"
      };

      if (!acceptableMoves.hasOwnProperty(move)) {
        throw "Invalid move";
      }

      const getRandomMove = () => acceptableMovesEnums[Math.floor(Math.random() * acceptableMovesEnums.length)];

      const result = singleCompare(acceptableMoves[move], acceptableMoves[getRandomMove()]);

      res.json({
        status: true,
        result: results[result]
      });
    } catch (err) {
      console.log(err); // debug
      res.status(500).json({
        status: false, error: err
      });
    }
  },

  async showGamePage(req, res) {
    res.render('play');
  },

  async showOnlinePlay(req, res) {
    // req.body.gameId

    // we need to make sure that the gameId exists in the Games.all
    // Games.find(gameId);

    // the user should be authenticated at this point.

    // we need to check if the authenticated user is one the players of the game.

    // check if the game is still ongoing and not finished.

    res.render('play', {
      playMode: "online",
      gameId: "<gameId>",
      myUsername: "<myUsername>",
      opponentUsername: "<opponentUsername>"
    });
  }
};

module.exports = GameController;