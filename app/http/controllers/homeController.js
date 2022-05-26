const HomeController = {
  async gameHome(req, res) {
    res.render('index');
  },
  async userHome(req, res) {
    res.render('userHome');
  },
  async signUp(req, res) {
    res.render('register');
  },
  async profile(req, res) {
    res.render('profile');
  }
};

module.exports = HomeController;