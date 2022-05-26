const HomeController = {
  async gameHome(req, res) {
    res.render('index');
  },

  async signUp(req, res) {
    res.render('register');
  },

  async profile(req, res) {
    res.render('profile');
  }
};

module.exports = HomeController;