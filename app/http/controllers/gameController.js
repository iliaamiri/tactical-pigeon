const singleCompare = include("./test/compare-moves");
const Games = include('./app/repos/Games');
const Tokens = include('./app/repos/Tokens');
const Players = include("app/repos/Players").Players;

const Player = include("app/models/Player");

const GameController = {
  async submitGameMove(req, res) {
    try {
      // console.log("api /games/submitMove post hit");
      const { move } = req.body;
      // console.log("Move: ", move);
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
    console.log('showOnlinePlay req.params:', req.params);
    const gameId = req.params.gameId;

    // we need to make sure that the gameId exists in the Games.all
    const game = Games.find(gameId);

    // the user should be authenticated at this point
    console.log('showOnlinePlay req.session.JWT:', req.cookies.JWT);
    const jwtToken = req.cookies.JWT;

    if (!jwtToken) {
      next(authExceptions.authFailed.errMessage);
      return;
    }
  
    const foundTokenObj = Tokens.all.get(jwtToken);
  
    if (!foundTokenObj) {
      next(authExceptions.authFailed.errMessage);
      return;
    }
  
    let foundPlayer = Players.find(foundTokenObj.playerId);
    console.log('foundPlyaerId:', foundPlayer.playerId);
  
    /* if (!foundPlayer) {
      foundPlayer = Object.create(Player);
      try {
        let decodedData = Tokens.verifyIntegrity(jwtToken);
        foundPlayer.initOnlinePlayer(decodedData.playerId, decodedData.username);
        Players.add(foundPlayer);
      } catch (err) {
        next(err);
        return;
      }
    } */

    let myUsername;
    let opponentUsername;

    // we need to check if the authenticated user is one the players of the game
    if (!game.players.includes(foundPlayer.playerId)) {
      // throw an error
      res.render('layouts/404');
      return;
    }

    let newArr = JSON.parse(JSON.stringify(game.players));
    const index = newArr.indexOf(foundPlayer.playerId);
    if (index > -1) {
      newArr.splice(index, 1); // 2nd parameter means remove one item only
    }
    myUsername = foundPlayer.playerId;
    opponentUsername = newArr[0];
    console.log('myId:', myUsername);
    console.log('opponentId:', opponentUsername);

    // check if the game is still ongoing and not finished
    let gameComplete = (game.gameComplete === true) ? true : false;

    res.render('play', {
      playMode: "online",
      gameId: gameId,
      myUsername: myUsername,
      gameComplete: gameComplete,
      opponentUsername: opponentUsername
    });
  }
};

module.exports = GameController;