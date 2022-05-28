const express = require('express');
const apiRouter = express.Router();

const corsOptions = require('../../config/cors.js');
const cors = require('cors');

apiRouter.use(cors(corsOptions));
apiRouter.use(express.json());

apiRouter.use('/auth', require("./auth.router"));
apiRouter.use('/games', require('./game.router'));
apiRouter.use('/profile', require('./profile.router'));
apiRouter.use('/external', require('./external.router'));

apiRouter.use((err, req, res, next) => {
  console.log("API ROUTER CENTRALIZED ERROR (DEBUG): ", err);

  if (err?.errMessage && err.errMessage === "AUTHENTICATION_FAILED") {
    res.redirect('/');
    return;
  }

  res.status(err.httpStatus ?? 500).json({
    status: false,
    error: err.errMessage ?? "Internal Error"
  });
});

module.exports = apiRouter;
