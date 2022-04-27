const express = require('express');
const GameController = require('../../app/controllers/gameController');
const gameRouter = express.Router();

gameRouter.get('/', GameController.showGamePage);

module.exports = gameRouter;
