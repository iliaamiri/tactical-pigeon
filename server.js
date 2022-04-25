const makeApp = require('./app');

/*
* ///////////// Importing the express module and initiating it (app) /////////////
* https://expressjs.com/
* */
const express = require("express");
const app = express();

/*
* ///////////// Importing the HTTP server Socket.io + Express.js, from app.js /////////////
* */
const server = makeApp(app);

/*
* ///////////// Setting the port that the app is listening on /////////////
* */
const PORT = process.env.PORT || 8080;

/*
* ///////////// Start listening /////////////
* */
server.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});