const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../../app/http/controllers/homeController');

homeRouter.get("/", HomeController.gameHome);


module.exports = homeRouter;
