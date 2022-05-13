const AuthExceptions = include("core/Exceptions/AuthExceptions");

const Player = include("app/models/Player");

const Players = include("app/repos/Players").Players;
const Tokens = include("app/repos/Tokens");

const AuthController = {
  /**
   * Handles login/signup. It expects one input and that is "givenUsername" in the body of the JSON request. If the username
   * exists, the user will be logged-in as that username. Otherwise, a new user (player) will be created and logged-in.
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async loginOrSignUp(req, res) {
    // Get the givenUsername input from body AND make sure of its existence.
    const {givenUsername} = req.body;
    if (!givenUsername) {
      throw AuthExceptions.badInput; // Send error if the parameter does not exist.
    }

    // Validate the username.
    if (givenUsername.length < 1 || givenUsername.length > 50) {
      throw AuthExceptions.badInput;
    }

    // Find user by the username from the Players repo. Create and save a new player with that username if no user -
    // had that username.
    let user = Players.findByUsername(givenUsername);
    if (!user) {
      user = Object.create(Player);
      user.initNewPlayer(givenUsername);

      Players.add(user);
    }

    console.log(user.playerId, givenUsername)

    // Make a JWT token and login the user.
    const generatedTokenValue = Tokens.create(user.playerId, givenUsername);

    // Send back the token value to the user.
    res.json({
      status: true,
      tokenValue: generatedTokenValue
    });
  }
};

module.exports = AuthController;