const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../../app/http/controllers/homeController');

const userAuthMiddleware = require("../../app/http/middlewares/userAuth");

homeRouter.get("/", userAuthMiddleware(false), HomeController.gameHome);
homeRouter.get('/signup', userAuthMiddleware(false), HomeController.signUp);


homeRouter.use(userAuthMiddleware(true));

homeRouter.get("/userHome", HomeController.userHome);
homeRouter.get('/profile', HomeController.profile);
homeRouter.get('/mapselection', HomeController.mapSelection);
// TODO: make this strict for the users not to be able to see customization page unless they are logged-in
homeRouter.get('/customizePigeon', HomeController.customizePigeon);

module.exports = homeRouter;
