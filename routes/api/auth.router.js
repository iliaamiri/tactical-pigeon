const express = require('express');
const authRouter = express.Router();

const AuthController = require('../../app/http/controllers/authController');

authRouter.post("/letMeIn", AuthController.loginOrSignUp);


module.exports = authRouter;
