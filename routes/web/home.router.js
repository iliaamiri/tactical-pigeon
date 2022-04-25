const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../../app/controllers/homeController');

homeRouter.get("/", HomeController.gameHome);
homeRouter.post("/", HomeController.submitGameMove);


module.exports = homeRouter;
