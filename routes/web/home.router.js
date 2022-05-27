const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../../app/http/controllers/homeController');

const userAuthMiddleware = require("../../app/http/middlewares/userAuth");

homeRouter.get("/", HomeController.gameHome);

homeRouter.get("/userHome", HomeController.userHome);
homeRouter.get('/signup', HomeController.signUp);
homeRouter.get('/profile', HomeController.profile);
homeRouter.get('/mapselection', HomeController.mapSelection);
// TODO: make this strict for the users not to be able to see customization page unless they are logged-in
homeRouter.get('/customizePigeon', userAuthMiddleware(false), HomeController.customizePigeon);
homeRouter.get('/profile', HomeController.profile);

module.exports = homeRouter;
