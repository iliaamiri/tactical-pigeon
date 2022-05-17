const express = require('express');
const router = express.Router();

/*
* ///////////// Importing the web routers /////////////
* Importing all the routers from /web folder
* */
const webRoutes = require('./web/index.web');
const apiRoutes = require('./api/index.api');

// injecting the web routes.
router.use('/api', apiRoutes);
router.use('/', webRoutes);

module.exports = router;