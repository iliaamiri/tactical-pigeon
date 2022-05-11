const singleCompare = include("./test/compare-moves");

const GameController = {
    async submitGameMove(req, res) {
        try {
            console.log("api /games/submitMove post hit");
            const {move} = req.body;
            console.log("Move: ", move);
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
            };

            if (!acceptableMoves.hasOwnProperty(move)) {
                throw "Invalid move";
            }

            const getRandomMove = () => acceptableMovesEnums[Math.floor(Math.random() * acceptableMovesEnums.length)];

            const result = singleCompare(acceptableMoves[move], acceptableMoves[getRandomMove()]);

            res.json({
                status: true,
                result: results[result]
            });
        } catch (err) {
            console.log(err); // debug
            res.status(500).json({
                status: false, error: err
            });
        }
    },

    async showGamePage(req, res) {
        res.render('play');
    }
};

module.exports = GameController;