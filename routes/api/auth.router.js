const express = require('express');
const authRouter = express.Router();

const AuthController = require('../../app/http/controllers/authController');

// Middlewares
const apiUserAuth = require('../../app/http/middlewares/apiUserAuth');

// Everything starts from /api/auth/
authRouter.post("/letMeIn", apiUserAuth(false), AuthController.loginOrSignUp);


module.exports = authRouter;
