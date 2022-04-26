const express = require('express');
const gameRouter = express.Router();

const HomeController = require('../../app/controllers/gameController');

gameRouter.post("/submitMove", HomeController.submitGameMove);


module.exports = gameRouter;
