/*
* ///////////// Importing the basic configuration values /////////////
* These configuration may include the options for session, cors, etc.
* */
// const sessionOptions = require('./config/session.js');

/*
* ///////////// Importing the express-session to handle (server-side) sessions /////////////
* https://www.npmjs.com/package/express-session
* */
//const session = require('express-session');
const cookieParser = require('cookie-parser');

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
  * ///////////// Initiating the socket.io module using the above server /////////////
  * */
  const io = require('./io')(server);

  /*
  * ///////////// Using the middlewares /////////////
  * Assigning the middlewares to express' instance
  * */
  //app.use((req, res, next) => { req.io = io; next(); })
  app.set('trust proxy', 1);
  app.set('view engine', 'ejs');
  app.use(express.urlencoded());
  app.use(express.static('public'));
  //app.use(session(sessionOptions));
  app.use(cookieParser());


  /*
  * Injecting all the routes to app.
  * */
  app.use('/', require('./routes/index'));

  return server;
}

module.exports = makeApp;
