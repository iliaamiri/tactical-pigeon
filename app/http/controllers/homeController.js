const HomeController = {
  async gameHome(req, res) {
    res.render('index');
  },
  async userHome(req, res) {
    res.render('userHome');
  },
};

module.exports = HomeController;