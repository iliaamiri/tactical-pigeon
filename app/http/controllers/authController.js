const SHA2 = require("sha2");
const crypto = require('crypto')
const {makeGuestId} = require("../../../core/utils");
const AuthExceptions = include("core/Exceptions/AuthExceptions");

const Player = include("app/models/Player");

const Players = include("app/repos/Players").Players;
const Tokens = include("app/repos/Tokens");

const database = include("databaseAccessLayer");

const passwordPepper = "SeCretPeppa4MySal+";

const AuthController = {
  /**
   * Handles login/signup for a guest.
   *
   * Definition of a guest: A guest is a user who doesn't want to be tracked and just wants to play casually. Their info
   * will not be tracked. There can be many guests with the exact same display name, which is only tracked in the frontend.
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async beOurGuest(req, res) {
    console.log(req.body, "be our guest")

    // Check if the user is already authenticated or not.
    if (req.user) {
      throw AuthExceptions.alreadyAuthenticated;
    }

    let user = Object.create(Player);
    user.initNewGuestPlayer();

    Players.addAsActivePlayer(user);

    console.log("ID:", user.playerId); // debug

    // Make a JWT token and login the guest user.
    const generatedTokenValue = Tokens.create(user.playerId, user.playerId);

    // Send back the token value to the user.
    res.json({
      status: true,
      tokenValue: generatedTokenValue,
      guestId: user.playerId
    });
  },

  async login(req, res) {
    // Check if the user is already authenticated or not.
    if (req.user && !Players.isGuest(req.user)) {
      throw AuthExceptions.alreadyAuthenticated;
    }

    const {givenEmail, givenPassword} = req.body;

    // Verify that inputs exist
    if (!givenEmail || !givenPassword) {
      // throw an exception
      throw AuthExceptions.badInput;
    }

    // Check with database.
    const foundUser = await database.playerEntity.getUserByEmail(givenEmail);
    if (!foundUser) {
      throw AuthExceptions.authFailed;
    }
    console.log('user from DB:', foundUser);
    let user = foundUser;

    // TODO: make sure the password checks out
    const password_hash = SHA2["SHA-512"](givenEmail + user.username + givenPassword + passwordPepper + user.password_salt).toString("hex");
    if (user.password_hash !== password_hash) {
      console.log(`hashes dont match. hash for password: ${password_hash}. hash from DB: ${user.password_hash}`);
      // ask to log in again
      throw AuthExceptions.authFailed;
    }
    console.log('login successful!');

    // Make a JWT token and login the guest user
    const generatedTokenValue = Tokens.create(user.player_id, user.username);

    // Send back the token value to the user.
    res.json({
      status: true,
      tokenValue: generatedTokenValue,
      username: user.username
    });
  },

  async signUpToBeTracked(req, res) {
    // Check if the user is already authenticated or not.
    if (req.user) {
      throw AuthExceptions.alreadyAuthenticated;
    }

    const {givenEmail, givenUsername, givenPassword} = req.body;

    // Verify that inputs exists
    if (!givenEmail || !givenPassword || givenPassword.length < 2) {
      // throw an exception
      throw AuthExceptions.badInput;
    }

    // TODO: Verify about the strength of the password.
    // TODO: at least 6 characters. at least 1 number, at least one uncommon character.

    // Verify we don't have a user with this email yet; get out if such record exists
    let existingUserWithThisEmail = await database.playerEntity.getUserByEmail(givenEmail);
    if (existingUserWithThisEmail) {
      throw AuthExceptions.emailAlreadyExists;
    }

    const passwordSalt = crypto.randomUUID({disableEntropyCache : true});
    console.log('passwordSalt', passwordSalt);
    const passwordHash = SHA2["SHA-512"](givenEmail + givenUsername + givenPassword + passwordPepper + passwordSalt).toString("hex");

    // TODO: Call Player.addToDatabase and verify that it was done successfully
    let signInResult;
    try {
      signInResult = await database.playerEntity.addUser({
        email: givenEmail, 
        username: givenUsername,
        hash: passwordHash,
        salt: passwordSalt,
      });
      // console.log('sign in DB result:', signInResult);
    } catch (error) {
      console.error('signup error:', error);
    }

    // Make a JWT token and login the guest user
    let signupData = await database.playerEntity.getUserByEmail(givenEmail);
    console.log('signupData', signupData);
    const newUser = signupData;
    console.log('newUser from DB:', newUser);
    const generatedTokenValue = Tokens.create(newUser.player_id, newUser.username);

    // Send back the token value to the user
    res.json({
      status: true,
      tokenValue: generatedTokenValue,
      username: newUser.username
    });
  },

  async authenticate(req, res) {
    if (req.user) {
      res.json({
        status: true,
        username: req.user.username,
        email: req.user.email || null,
        selectedPigeon: req.user.selectedPigeon || null,
      });
    } else {
      res.json({
        status: false,
      });
    }
  },
};

module.exports = AuthController;