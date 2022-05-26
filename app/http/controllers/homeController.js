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
  },
  async mapSelection(req, res) {
    res.render('chooseMap');
  },
  async customizePigeon(req, res) {
    res.render('customizePigeon');
  },
};

module.exports = HomeController;