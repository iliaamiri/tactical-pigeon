const express = require('express');
const apiRouter = express.Router();

const corsOptions = require('../../config/cors.js');
const cors = require('cors');

apiRouter.use(cors(corsOptions));
apiRouter.use(express.json());

apiRouter.use('/games', require('./game.router'));

module.exports = apiRouter;
