/*
* ///////////// Importing the dotenv module to handle reading environment variables from .env file /////////////
* */
const dotenv = require('dotenv');

/*
* ///////////// Loading the environment variable configurations from .env file /////////////
* */
dotenv.config();

/*
* ///////////// Importing the basic configuration values /////////////
* These configuration may include the options for session, cors, etc.
* */
const sessionOptions = require('./config/session.js');
const corsOptions = require('./config/cors.js')

/*
* ///////////// Importing the express-session to handle (server-side) sessions /////////////
* https://www.npmjs.com/package/express-session
* */
const session = require('express-session');

/*
* ///////////// Importing the http module to use it for integrating socket.io with express.js /////////////
* */
const http = require("http");

const express = require("express");


function makeApp(app) {
    /*
    * ///////////// Creating a http server using express' instance /////////////
    * */
    const server = http.createServer(app);

    /*
    * ///////////// Importing the Server class from socket.io module and initiating the socket.io using the above server /////////////
    * */
    const io = require('socket.io')(server);

    /*
    * ///////////// Importing the middlewares /////////////
    * Some of these middlewares are popular and have been used in API projects. Cors Middleware is one example.
    * Most of them are created and used within this project based on the project's needs.
    * */
    const cors = require('cors');

    /*
    * ///////////// Using the middlewares /////////////
    * Assigning the middlewares to express' instance
    * */
    //app.use((req, res, next) => { req.io = io; next(); })
    app.set('trust proxy', 1);
    app.set('view engine', 'ejs');
    app.use(express.urlencoded());
    app.use(express.static('public'));
    app.use(session(sessionOptions));
    // app.use(cors(corsOptions));
    // app.use(express.json());


    /*
    * Injecting all the routes to app.
    * */
    app.use('/', require('./routes/index'));

    return app;
}

module.exports = makeApp;
