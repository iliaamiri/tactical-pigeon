const singleCompare = require("../../test/compare-moves");

const HomeController = {
    async gameHome(req, res) {
        let lastStatus = "";
        res.render('index'); // 
    },
};

module.exports = HomeController;