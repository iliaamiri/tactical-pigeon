const express = require('express');
const webRouter = express.Router();

webRouter.use("/", require('./home.router'));

module.exports = webRouter;
