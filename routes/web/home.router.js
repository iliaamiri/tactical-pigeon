const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../../app/controllers/homeController');

homeRouter.get("/", HomeController.gameHome);


module.exports = homeRouter;
