const singleCompare = include("./test/compare-moves");
const Games = include('./app/repos/Games');
const Tokens = include('./app/repos/Tokens');
const Players = include("app/repos/Players").Players;

// Exceptions
const AuthExceptions = include('core/Exceptions/AuthExceptions');
const GameExceptions = include('core/Exceptions/GameExceptions');

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
    let mySelectedPigeon = null;

    if (req.user) {
      mySelectedPigeon = await req.user.fetchSelectedPigeon();
    }

    res.render('battle/play', {
      playMode: "offline",
      mySelectedPigeon: mySelectedPigeon
    });
  },

  async showOnlinePlay(req, res) {
    const gameId = req.params.gameId;

    // we need to make sure that the gameId exists in the Games.all
    const game = Games.find(gameId);

    if (!game) {
      res.render('layouts/404', {
        error: GameExceptions.gameNotFound.errMessage
      });
      return;
    }

    // check if the game is still ongoing and not finished
    let gameComplete = (game.gameComplete === true);

    // the user should be authenticated at this point
    const jwtToken = req.cookies.JWT;

    if (!jwtToken) {
      res.render('layouts/404', {
        error: AuthExceptions.authFailed.errMessage
      });
      return;
    }
  
    const foundTokenObj = Tokens.all.get(jwtToken);
    if (!foundTokenObj) {
      res.render('layouts/404', {
        error: AuthExceptions.authFailed.errMessage
      });
      return;
    }
  
    let foundPlayer = Players.findActiveUserById(foundTokenObj.playerId);

    let myUsername;
    let opponentUsername;

    // we need to check if the authenticated user is one of the players of the game
    if (!game.players.includes(foundPlayer.playerId)) {
      // throw an error
      res.render('layouts/404');
      return;
    }

    // If the game was already finishes, let the user know, and allow them to redirect back to home or something.
    if (gameComplete) {
      res.render('layouts/gameAlreadyEnded');
      return;
    }

    // Get opponent player's playerId
    let opponentPlayerId = game.players.find(playerId => playerId !== foundPlayer.playerId);

    myUsername = Players.findActiveUserById(foundPlayer.playerId).username;
    let opponent = Players.findActiveUserById(opponentPlayerId);
    opponentUsername = opponent.username;

    let mySelectedPigeon = await foundPlayer.fetchSelectedPigeon();
    let opponentSelectedPigeon = await opponent.fetchSelectedPigeon();
    console.log("My Selected Pigeon: ", mySelectedPigeon);
    console.log("Opponent Selected Pigeon: ", opponentSelectedPigeon);

    res.render('battle/play', {
      playMode: "online",
      gameId: gameId,
      myUsername: myUsername,
      mySelectedPigeon: mySelectedPigeon,
      opponentSelectedPigeon: opponentSelectedPigeon,
      gameComplete: gameComplete,
      opponentUsername: opponentUsername
    });
  },

  

  
};

module.exports = GameController;