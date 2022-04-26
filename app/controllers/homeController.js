const singleCompare = require("../../test/compare-moves");

const HomeController = {
    async gameHome(req, res) {
        let lastStatus = "";
        res.render('home');
    },
};

module.exports = HomeController;