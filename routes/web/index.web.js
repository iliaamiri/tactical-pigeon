const express = require('express');
const webRouter = express.Router();

webRouter.use("/", require('./home.router'));
webRouter.use('/play', require('./game.router'));

module.exports = webRouter;
