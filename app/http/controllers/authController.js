const {makeGuestId} = require("../../../core/utils");
const AuthExceptions = include("core/Exceptions/AuthExceptions");

const Player = include("app/models/Player");

const Players = include("app/repos/Players").Players;
const Tokens = include("app/repos/Tokens");

const AuthController = {
  /**
   * Handles login/signup for a guest.
   *
   * Definition of a guest: A guest is a user who doesn't want to be tracked and just wants to play casually. Their info
   * will not be tracked. There can be many guests with the exact same username.
   *
   * This controller expects an optional `guestId`. If there was an `guestId`, they will be logged-in as that guest.
   * If there were no guestId, the controller will make a new guest user and logs them in.
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async beOurGuest(req, res) {
    console.log(req.user, "ayy")

    // Check if the user is already authenticated or not.
    if (req.user) {
      throw AuthExceptions.alreadyAuthenticated;
    }

    // Get the guestId input from body. This is optional.
    let {givenUsername, givenGuestId} = req.body;

    console.log(givenGuestId);

    let user;

    if (givenGuestId) {
      // Validate the guestId.
      givenGuestId = givenGuestId.trim().toLowerCase();
      if (givenGuestId.length < 5 || givenGuestId.substring(0, 6) !== "guest_") {
        console.log("here", givenGuestId, givenGuestId.length, givenGuestId.substring(0, 6), givenGuestId.substring(0, 6) === "guest_")
        throw AuthExceptions.badInput;
      }

      user = Players.findGuestUser(givenGuestId);
      if (!user) {
        user = Object.create(Player);
        user.initNewGuestPlayer();

        Players.addAsActivePlayer(user);
      }
    } else {
      user = Object.create(Player);
      user.initNewGuestPlayer();

      Players.addAsActivePlayer(user);
    }

    console.log("Authenticated as a guest. Guest ID: ", user.playerId); // debug

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
    if (req.user) {
      throw AuthExceptions.alreadyAuthenticated;
    }

    const {givenUsername, givenPassword} = req.body;

    // Verify that inputs exists
    if (givenUsername || givenPassword) {
      // TODO: throw an exception
    }

    // Verify about the integrity of the email address
    // TODO: regex or something

    // Check with database.
    // Throw an exception if not found

    // make token

    // success! give token
  },

  async signUpToBeTracked(req, res) {
    // Check if the user is already authenticated or not.
    if (req.user) {
      throw AuthExceptions.alreadyAuthenticated;
    }

    const {givenUsername, givenPassword} = req.body;

    // Verify that inputs exists
    if (givenUsername || givenPassword) {
      // TODO: throw an exception
    }

    // Verify about the integrity of the email address
    // TODO: regex or something

    // Verify about the strength of the password.
    // TODO: at least 6 characters. at least 1 number, at least one uncommon character.

    // TODO: Call Player.addToDatabase and verify that it  was done successfully
    // throw an exception if not successful

    // Success! res.json({status: true})
  },
};

module.exports = AuthController;