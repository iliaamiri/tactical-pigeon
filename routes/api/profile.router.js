const express = require('express');
const profileRouter = express.Router();

const ProfileController = require('../../app/http/controllers/profileController');

profileRouter.post("/getUserData", ProfileController.getUserData);


module.exports = profileRouter;