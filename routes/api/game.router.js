const express = require('express');
const gameRouter = express.Router();

const GameController = require('../../app/http/controllers/gameController');

gameRouter.post("/submitMove", GameController.submitGameMove);


module.exports = gameRouter;
