const singleCompare = require("../../test/compare-moves");

const HomeController = {
    async gameHome(req, res) {
        res.render('index'); 
    },
};

module.exports = HomeController;