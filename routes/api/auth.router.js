const express = require('express');
const authRouter = express.Router();

const AuthController = require('../../app/http/controllers/authController');

// Middlewares
const apiUserAuth = require('../../app/http/middlewares/apiUserAuth');

// Everything starts from /api/auth/
authRouter.post("/letMeIn", apiUserAuth(false), AuthController.beOurGuest);
authRouter.post("/login", apiUserAuth(false), AuthController.login);
authRouter.post('/signUp', apiUserAuth(false), AuthController.signUpToBeTracked)


module.exports = authRouter;
