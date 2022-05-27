const express = require('express');
const authRouter = express.Router();

const AuthController = require('../../app/http/controllers/authController');

// Middlewares
const userAuth = require('../../app/http/middlewares/userAuth');

// Everything starts from /api/auth/
authRouter.post("/letMeIn", userAuth(false), AuthController.beOurGuest);
authRouter.post("/login", userAuth(false), AuthController.login);
authRouter.post('/signUp', userAuth(false), AuthController.signUpToBeTracked)


module.exports = authRouter;
