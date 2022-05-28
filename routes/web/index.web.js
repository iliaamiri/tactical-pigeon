const express = require('express');
const webRouter = express.Router();

webRouter.use("/", require('./home.router'));
webRouter.use('/play', require('./game.router'));

webRouter.use((req, res, next) => {
  res.render('layouts/404');
});

// centralized 505 error.
webRouter.use((err, req, res, next) => {
  console.log("WEB ROUTER CENTRALIZED ERROR (DEBUG): ", err);
  if (err?.errMessage && err.errMessage === "AUTHENTICATION_FAILED") {
    res.redirect('/');
    return;
  }
  // handles any internal error so user won't see weird things
  res.render('layouts/505.ejs', {error: err})
});

module.exports = webRouter;
