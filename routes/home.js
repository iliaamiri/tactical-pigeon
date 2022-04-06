const express = require('express');
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    let lastStatus = "";
    res.render('home', {status: lastStatus, error: "You haven't played yet."})
})

const singleCompare = require('../test/compare-moves.js');

homeRouter.post('/', async (req, res, next) => {
    try {
        console.log("post hit");
        const { move } = req.body;
        console.log(move)
        const acceptableMovesEnums = ["attack", "block", "none"];
        const acceptableMoves = {
            "attack": "a",
            "block": "b",
            "none": ""
        };
        const results = {
            "player 1 wins": "won",
            "player 2 wins": "lost",
            "nothing happened": "draw"
        }

        if (!acceptableMoves.hasOwnProperty(move)) {
            throw "Invalid move";
        }

        const getRandomMove = () => acceptableMovesEnums[Math.floor(Math.random() * acceptableMovesEnums.length)];

        const result = singleCompare(acceptableMoves[move], acceptableMoves[getRandomMove()]);

        res.render('home', {
            status: true,
            result: results[result]
        })
    } catch (err) {
        console.log(err); // debug
        res.render('home', { status: false, error: err });
    }
});


module.exports = homeRouter;
