const jwt = require("jsonwebtoken");
const config = require("../../config/app.config");

const Token = require("../models/Token");

const {DateTime} = require("luxon");

const Tokens = {
  all: new Map(), //: Map<jwtToken, Token>

  /**
   * Signs a new JWT token using the private key with the payloads: playerId, username, and createdAt.
   * Creates a new instance of Token model and saves it in the collection `this.all`.
   * @param playerId
   * @param username  // Username of the player, authenticating.
   * @param expiresIn // This is luxon Date object that marks the expire date of this token. This has a default value of
   *                     one day.
   * @returns string // The value of JWT token
   */
  create(playerId, username, expiresIn = DateTime.now().plus({day: 1})) {
    // Getting the timestamp for the expiry date.
    const expiresInTimestamp = expiresIn.valueOf();

    let newJwtToken;
    // For some reason I don't know, JWT library throws an error when running for the first time.
    // So, this for loop tries to re-try the process so that it always works regardless.
    for (let i = 0; i < 2; i++) {
      try {
        newJwtToken = jwt.sign({
              playerId,
              username,
              createdAt: Date.now()
            },
            config.JWT_RSA_PRIVATE_KEY, // Private Key loaded from jwtRS256.key file.
            {
              algorithm: 'RS256',
              expiresIn: expiresInTimestamp
            }
        );

        break;
      } catch (err) {
        // console.debug(err); // debug 🤷
      }
    }

    // Instantiate a new Token object. And construct it.
    const newTokenObj = Object.create(Token);
    newTokenObj.initCreate(playerId, newJwtToken, expiresInTimestamp);

    // console.debug(newTokenObj);

    this.all.set(newJwtToken, newTokenObj);

    return newJwtToken;
  },

  /**
   * Verifies the integrity of a JWT token by trying to decrypt the token and read the data. If the data had the correct
   * format, it means that the token is valid.
   *
   * This method returns the Decoded data from the encrypted token value if the token was valid.
   *
   * @param tokenValue
   * @returns {boolean|{createdAt}|{username}|{playerId}|*}
   */
  verifyIntegrity(tokenValue) {
    try {
      // Try to decode the JWT token value using Public Key (RS256 Algorithm).
      let decodedData = jwt.verify(tokenValue, config.JWT_RSA_PUBLIC_KEY, { algorithm: "RS256" });

      // Check if whether the decodedData is there, and it has the three properties of a valid token (playerId, username, and
      // createdAt). If not, return `false` to say it is invalid.
      if (!decodedData || !decodedData.playerId || !decodedData.username || !decodedData.createdAt) {
        return false;
      }

      // Return the decoded payload (data) if the JWT token were valid.
      return decodedData;
    } catch (error) {
      console.log(error);
    }
    return false;
  },

  /**
   * Removes the JWT Token from the Tokens repository. Forgets the token.
   * @param jwtToken
   */
  revoke(jwtToken) {
    this.all.delete(jwtToken);
  }
};

module.exports = Tokens;