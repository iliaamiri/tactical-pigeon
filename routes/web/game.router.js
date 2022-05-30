const express = require('express');
const GameController = require('../../app/http/controllers/gameController');
const gameRouter = express.Router();

const userAuthMiddleware = require('../../app/http/middlewares/userAuth');

gameRouter.use(userAuthMiddleware(false));

// Everything here starts from: /play
gameRouter.get('/', GameController.showGamePage);
gameRouter.get('/:gameId', GameController.showOnlinePlay);

module.exports = gameRouter;
