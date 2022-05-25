// Repos
const Games = include("app/repos/Games");
const {Players} = include("app/repos/Players");

// Models
const Move = include("app/models/Move");

// Exceptions
const GameExceptions = include("core/Exceptions/GameExceptions");

// Helpers
const lifeAccountingAndRoundEvaluation = require("../../helpers/roundSubmitMove/lifeAccountingAndRoundEvaluation");
const preparePayloadAndEmit = require("../../helpers/roundSubmitMove/preparePayloadAndEmit");

module.exports = (io, socket) => {
  return (payload) => {
    /*
          payload: {
            gameId: <string>
            move: {
              head: 'none' / 'attack' / 'block',
              body: 'none' / 'attack' / 'block',
              legs: 'none' / 'attack' / 'block',
            }
          }
        */
    const {gameId, move} = payload;

    // Find the game by gameId
    const foundGame = Games.find(gameId);
    if (!foundGame) {
      socket.emit(':error', GameExceptions.gameNotFound);
      return;
    }

    if (foundGame.gameComplete) {
      socket.emit(':error', GameExceptions.gameNotFound);
      return;
    }

    // Get players of the found game.
    const playersIds = foundGame.players;

    // Find this player who requested a game fetch and verify if they are in this game or not.
    const thisPlayerId = Object.values(playersIds)
      .find(_playerId => _playerId === socket.user.playerId);
    if (!thisPlayerId) {
      // For security, don't tell the noisy people if the game even exists or not.
      socket.emit(':error', GameExceptions.gameNotFound);
      return;
    }

    let thisPlayer = socket.user;

    // Get the current Round
    let currentRound = foundGame.getCurrentRound();

    // Verify that the Round is finished or not. TODO: figure this out.
    // if (currentRound.isRoundFinished()) {
    //   socket.emit(':error', GameExceptions.roundFinishedAlready);
    //   return;
    // }

    // Get opponent's playerId
    const otherPlayerId = Object.values(playersIds)
      .find(_playerId => _playerId !== socket.user.playerId);

    // Find opponent's player object.
    let otherPlayer = Players.findActiveUserById(otherPlayerId);

    // Update the round moves for the current round.
    foundGame.updateRoundMoves(move, thisPlayer);

    // Get this player's moves
    let thisPlayerMove = currentRound.moves[thisPlayer.playerId];

    // Inventory Ammo accounting
    // console.log('this player move to account: ', thisPlayerMove);
    // Decrease the inventory ammo if applicable.
    Object.values(thisPlayerMove).forEach(bodyPartMove => {
      if (bodyPartMove === 'attack') {
        thisPlayer.ammoInventory.attackDecrease();
      } else if (bodyPartMove === 'block') {
        thisPlayer.ammoInventory.blockDecrease();
      }
    });
    // console.log('this player inventory', JSON.stringify(thisPlayer.ammoInventory)); // debug

    // If both players' moves have not been received yet, don't continue.
    if (!currentRound.movesCompleted()) {
      currentRound.timeoutObject = setTimeout(() => {
        // Make an empty move for the other player. (Consider the other player's move as an empty move).
        let otherPlayerMove = Object.create(Move);

        // Life accounting and Round evaluation
        lifeAccountingAndRoundEvaluation(currentRound, otherPlayerId, thisPlayerMove, thisPlayer, otherPlayerMove, otherPlayer, foundGame);

        preparePayloadAndEmit(io, foundGame, otherPlayerMove, thisPlayerMove, thisPlayer, otherPlayer);
      }, currentRound.getTimeLeftTilRoundFinishes() + 5000);
      return;
    }

    // Clear the timeout, because the opponent has submitted their move it seems.
    currentRound.clearMoveTimout();

    // Get the other player's moves
    let otherPlayerMove = currentRound.moves[otherPlayerId];

    // Life accounting and Round evaluation
    lifeAccountingAndRoundEvaluation(currentRound, otherPlayerId, thisPlayerMove, thisPlayer, otherPlayerMove, otherPlayer, foundGame);

    preparePayloadAndEmit(io, foundGame, otherPlayerMove, thisPlayerMove, thisPlayer, otherPlayer);

    if (foundGame.gameComplete) {
      const winnerPlayerId = foundGame.calculateGameResults(thisPlayer, otherPlayer);
      let winnerPlayer = null;
      if (winnerPlayerId) {
        winnerPlayer = (winnerPlayerId === thisPlayerId) ? thisPlayer : otherPlayer;
      }
      foundGame.end(thisPlayer, otherPlayer, winnerPlayer);
      thisPlayer.cleanUpAfterGame();
      otherPlayer.cleanUpAfterGame();
    }
  };
};