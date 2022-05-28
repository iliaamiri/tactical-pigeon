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
    res.render('userHome');
  },
  async signUp(req, res) {
    if (req.user && req.user.email) {
      console.log('req.user', req.user);
      res.redirect('/userHome');
      return;
    }
    res.render('auth/register');
  },
  async profile(req, res) {
    res.render('profile/profile');
  },
  async mapSelection(req, res) {
    res.render('profile/chooseMap');
  },
  async customizePigeon(req, res) {
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
      if (foundSelectedPigeon) {
        selectedPigeon = {
          pigeonId: foundSelectedPigeon.getPigeonId(),
          ...foundSelectedPigeon.toJSON()
        };
      }

      myPigeons = playerPigeons.map(pigeon => {
        return {
          pigeonId: pigeon.getPigeonId(),
          isSelected: foundSelectedPigeon.getPigeonId() === pigeon.getPigeonId(),
          ...pigeon.toJSON(),
        }
      });
      numberOfLockedPigeons = await req.user.countUnlockedPigeons();
    }
    console.log("selectedPigeon", {
      selectedPigeon: selectedPigeon,
      myPigeons: myPigeons,
      numberOfLockedPigeons: numberOfLockedPigeons,
    });
    
    res.render('profile/customizePigeon', {
      selectedPigeon: selectedPigeon,
      myPigeons: myPigeons,
      numberOfLockedPigeons: numberOfLockedPigeons,
    });
  },
};

module.exports = HomeController;