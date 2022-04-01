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
const session = require('express-session')

/*
* ///////////// Importing the express module and initiating it (app) /////////////
* https://expressjs.com/
* */
const express = require('express');
const app = express();

/*
* ///////////// Importing the http module to use it for integrating socket.io with express.js /////////////
* */
const http = require('http');

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
app.use((req, res, next) => { req.io = io; next(); })
app.set('trust proxy', 1);
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(express.json());

/*
* ///////////// Importing the routers /////////////
* Importing all the routers from /routes folder
* */
// ... Sample:
// const homeRoutes = require('./routes/home.js');


/*
* ///////////// Using the routers /////////////
* Assigning the routes to express' instance
* */
// ... Sample:
// app.use('/', homeRoutes);

// centralized 505 error.
app.use((err, req, res, next) => {
    // handles any internal error so user won't see weird things
    res.render('layout/505.ejs', { error: err })
});

module.exports = server;
