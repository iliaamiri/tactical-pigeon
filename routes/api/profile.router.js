const express = require('express');
const profileRouter = express.Router();

const ProfileController = require('../../app/http/controllers/profileController');

const userAuth = require('../../app/http/middlewares/userAuth');

profileRouter.use(userAuth(true));

profileRouter.get("/getUserData", ProfileController.getUserData);
profileRouter.post("/updatePigeonCustomization", ProfileController.updatePigeonCustomization);


module.exports = profileRouter;