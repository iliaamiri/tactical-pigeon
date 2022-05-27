const Player = require('../../models/Player');

const HomeController = {
  async gameHome(req, res) {
    if (req.user && req.user.email) {
      console.log('req.user', req.user);
      res.redirect('/userHome');
      return;
    }
    res.render('index');
  },
  async userHome(req, res) {
    if (!req.user.email) {
      res.redirect('/');
      return;
    }
    res.render('userHome');
  },
  async signUp(req, res) {
    if (!req.user.email) {
      res.redirect('/');
      return;
    }
    res.render('register');
  },
  async profile(req, res) {
    if (!req.user.email) {
      res.redirect('/');
      return;
    }
    res.render('profile');
  },
  async mapSelection(req, res) {
    if (!req.user.email) {
      res.redirect('/');
      return;
    }
    res.render('chooseMap');
  },
  async customizePigeon(req, res) {
    if (!req.user.email) {
      res.redirect('/');
      return;
    }
    console.log("req.user received: ", req.user);

    // /* FOR TEST PURPOSES ONLY */
    // if (!req.user) {
    //   req.user = Object.create(Player);
    //   req.user.initOnlinePlayer(1, "ilia", "a@a.com");
    // }
    // /* ---- FOR TEST PURPOSES ONLY */

    const playerPigeons = await req.user.getPigeons();

    let myPigeons = [];
    let selectedPigeon = null;
    let numberOfLockedPigeons = 0;
    if (playerPigeons && playerPigeons.length !== 0) {
      const foundSelectedPigeon = await req.user.fetchSelectedPigeon();
      console.log(foundSelectedPigeon.getPigeonId())
      if (foundSelectedPigeon) {
        selectedPigeon = {
          pigeonType: foundSelectedPigeon.pigeonType.toJSON(),
          ...foundSelectedPigeon.toJSON(),
        };
      }

      myPigeons = playerPigeons.map(pigeon => {
        return {
          isSelected: foundSelectedPigeon.getPigeonId() === pigeon.getPigeonId(),
          ...pigeon.toJSON(),
          pigeonType: pigeon.pigeonType.toJSON()
        }
      });
      numberOfLockedPigeons = await req.user.countUnlockedPigeons();
    }
    console.log("selectedPigeon", {
      selectedPigeon: selectedPigeon,
      myPigeons: myPigeons,
      numberOfLockedPigeons: numberOfLockedPigeons,
    });
    
    res.render('customizePigeon', {
      selectedPigeon: selectedPigeon,
      myPigeons: myPigeons,
      numberOfLockedPigeons: numberOfLockedPigeons,
    });
  },
};

module.exports = HomeController;