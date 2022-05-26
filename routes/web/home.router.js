const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../../app/http/controllers/homeController');

homeRouter.get("/", HomeController.gameHome);
homeRouter.get('/signup', HomeController.signUp);
homeRouter.get('/profile', HomeController.profile);


module.exports = homeRouter;
