/*
* ///////////// Importing the dotenv module to handle reading environment variables from .env file /////////////
* */
const dotenv = require('dotenv');

/*
* ///////////// Importing the HTTP server Socket.io + Express.js, from app.js /////////////
* */
const server = require('./app.js');

/*
* ///////////// Loading the environment variable configurations from .env file /////////////
* */
dotenv.config();

/*
* ///////////// Setting the port that the app is listening on /////////////
* */
const PORT = process.env.PORT || 8080;

/*
* ///////////// Start listening /////////////
* */
server.listen(PORT, () => {
    console.log("Running on port " + PORT)
});