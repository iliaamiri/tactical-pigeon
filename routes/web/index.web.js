const express = require('express');
const webRouter = express.Router();

webRouter.use("/", require('./home.router'));
webRouter.use('/play', require('./game.router'));

// centralized 505 error.
webRouter.use((err, req, res, next) => {
    console.log(err);
    // handles any internal error so user won't see weird things
    res.render('layouts/505.ejs', { error: err })
});

module.exports = webRouter;
