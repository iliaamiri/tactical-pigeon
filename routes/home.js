const express = require('express');
const homeRouter = express.Router();


homeRouter.get("/", (req, res) => {
    res.render('home', {lastStatus})
})




module.exports = homeRouter;

