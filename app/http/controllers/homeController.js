const Tokens = require("../../repos/Tokens");

const HomeController = {
  async gameHome(req, res) {
    console.log(req.cookies);
    // Go back home if you don't have a user cookie
    if (!req.cookies || !req.cookies.JWT) {
      res.render('index');
      return;
    }
    const decodedData = Tokens.verifyIntegrity(req.cookies.JWT);
    // if we don't pass the cookie test, go back home too
    if (!decodedData) {
      res.render('index');
      return;
    }
    res.redirect('/userHome');
  },
  async userHome(req, res) {
    // Go back home if you don't have a user cookie
    if (!req.cookies || !req.cookies.JWT) {
      res.redirect('/');
      return;
    }
    const decodedData = Tokens.verifyIntegrity(req.cookies.JWT);
    // if we don't pass the cookie test, go back home too
    if (!decodedData) {
      res.redirect('/');
      return;
    }
    res.render('userHome');
  },
  async signUp(req, res) {
    res.render('register');
  },
  async profile(req, res) {
    // Go back home if you don't have a user cookie
    if (!req.cookies || !req.cookies.JWT) {
      res.redirect('/');
      return;
    }
    const decodedData = Tokens.verifyIntegrity(req.cookies.JWT);
    // if we don't pass the cookie test, go back home too
    if (!decodedData) {
      res.redirect('/');
      return;
    }
    res.render('profile');
  },
  async mapSelection(req, res) {
    // Go back home if you don't have a user cookie
    if (!req.cookies || !req.cookies.JWT) {
      res.redirect('/');
      return;
    }
    const decodedData = Tokens.verifyIntegrity(req.cookies.JWT);
    // if we don't pass the cookie test, go back home too
    if (!decodedData) {
      res.redirect('/');
      return;
    }
    res.render('chooseMap');
  },
  async customizePigeon(req, res) {
    // Go back home if you don't have a user cookie
    if (!req.cookies || !req.cookies.JWT) {
      res.redirect('/');
      return;
    }
    const decodedData = Tokens.verifyIntegrity(req.cookies.JWT);
    // if we don't pass the cookie test, go back home too
    if (!decodedData) {
      res.redirect('/');
      return;
    }
    res.render('customizePigeon');
  },
};

module.exports = HomeController;