const express = require('express');
const GameController = require('../../app/http/controllers/gameController');
const gameRouter = express.Router();

// Everything here starts from: /play
gameRouter.get('/', GameController.showGamePage);
gameRouter.get('/:gameId', GameController.showOnlinePlay);
gameRouter.get('/map/selection', GameController.mapSelection);
gameRouter.get('/customizePigeon', GameController.customizePigeon);
gameRouter.get('/profile', GameController.profile);

module.exports = gameRouter;
