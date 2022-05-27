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
    console.log(req.user);
    const playerPigeons = await req.user.getPigeons();

    let myPigeons = [];
    if (playerPigeons.length !== 0) {
      myPigeons = myPigeons.map(pigeon => {
        return {
          ...pigeon.toJSON(),
          pigeonType: pigeon.pigeonType.toJSON()
        }
      });
    }

    res.render('customizePigeon', {
      myPigeons: myPigeons
    });
  },
};

module.exports = HomeController;