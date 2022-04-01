const express = require('express');
const homeRouter = express.Router();
const singleCompare = require('../test/compare-moves.js');

homeRouter.post('/', async (req, res, next) => {
    try {
        console.log("post hit");
        const { moves } = req.body;
        const acceptableMovesEnums = ["attack", "block", "none"];
        const acceptableMoves = {
            "attack": "a",
            "block": "b",
            "none": ""
        };

        if (!acceptableMoves.hasOwnProperty(moves)) {
            throw "Invalid move";
        }

        const getRandomMove = () => acceptableMovesEnums[Math.floor(Math.random() * acceptableMovesEnums.length)];

        const result = singleCompare(acceptableMoves[moves], acceptableMoves[getRandomMove()]);

        res.render('home', {
            status: true,
            result: result
        })
    } catch (err) {
        console.log(err); // debug
        res.render('home', { status: false, error: err });
    }
});

module.exports = homeRouter;