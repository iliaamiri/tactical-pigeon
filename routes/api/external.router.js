const express = require('express');
const externalRouter = express.Router();

const ExternalController = require('../../app/http/controllers/externalController');

// Everything starts from /api/external
externalRouter.get("/js-common-vars", ExternalController.jsCommonVars);


module.exports = externalRouter;