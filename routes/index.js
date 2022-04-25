const express = require('express');
const router = express.Router();

/*
* ///////////// Importing the web routers /////////////
* Importing all the routers from /web folder
* */
const webRoutes = require('./web/index.web');
const apiRoutes = require('./api/index.api');

// injecting the web routes.
router.use('/', webRoutes);
router.use('/api', apiRoutes);


// centralized 505 error.
router.use((err, req, res, next) => {
    console.log(err);
    // handles any internal error so user won't see weird things
    res.render('layouts/505.ejs', { error: err })
});

module.exports = router;