import authCache from "../storage/authCache.js";
import userCache from "../storage/userCache.js";
import guestInfoCache from "../storage/guestInfoCache.js";

const Auth = {
  isLoggedIn: false,
  isLoggedInAsGuest: false,

  jwtToken: null,

  username: null,
  email: null,

  displayName: null,

  async authenticate() {
    try {
      // Check if the user is logged in on the server or not.
      const apiResponse = await axios.post('/api/auth/authenticate');
      const result = apiResponse.data;

      // If the user is NOT logged in, clear all the cache related to the user (auth token and user information).
      if (!result.status) {
        this._forgetAllYouHave();
        return false;
      }

      // If the user is logged in, save the user information to the cache.
      // And remember that the user is logged in.
      this.isLoggedIn = true;
      this.isLoggedInAsGuest = this._isUsernameInGuestIdFormat(result.username);

      this.username = result.username;

      if (this.isLoggedInAsGuest) {
        this._rememberTheGuest();
      } else {
        this._rememberTheTrackedUser();
      }

      this.jwtToken = authCache.fetchJWT();

      return true;
    } catch (APIError) {
      // Unexpected error.
      console.error(APIError);
    }
  },

  async login(givenEmail, givenPassword) {
    try {
      // Send the user's credentials to the server and try to log-in.
      const logInResponse = await axios.post("/api/auth/login", {
        givenEmail, givenPassword
      });

      const authResult = logInResponse.data;
      if (!authResult.status) {
        return false;
      }

      this._cacheTrackedUserReceivedPayload(authResult.username, authResult.tokenValue, givenEmail);

      // Remember that the user is logged in.
      this.isLoggedIn = true;

      return true;
    } catch (APIError) {
      // Unexpected error.
      console.error(APIError);
      return false;
    }
  },

  async loginAsGuest(displayName = "Guest") {
    try {
      const apiResponse = await axios.post("/api/auth/letMeIn");

      const authResult = apiResponse.data;
      if (!authResult.status) {
        console.log(authResult); // debug
        return false;
      }

      const tokenValue = authResult.tokenValue;
      const guestId = authResult.guestId;

      this.isLoggedIn = true;
      this.isLoggedInAsGuest = true;

      this.username = guestId;

      this.displayName = displayName;
      this._rememberTheGuest(displayName);

      this.jwtToken = tokenValue;
      authCache.saveJWT(tokenValue);

      return true;
    } catch (APIError) {
      // Unexpected error.
      console.error(APIError);
      let errMessage = APIError.message;

      if (errMessage === "ALREADY_AUTHENTICATED") {
        console.log("Already logged in as a guest. This code should not be reached. Either the code is wrong or the client" +
          "is intentionally trying to log in as a guest when it is already logged in as a guest.");
        return true;
      }

      return false;
    }
  },

  async signUp(givenEmail, givenPassword, givenDisplayName) {
    try {
      const signUpResponse = await axios.post("/api/auth/signup", {
        givenEmail, givenPassword, givenDisplayName
      });

      const signUpResult = signUpResponse.data;
      if (!signUpResult.status) {
        return signUpResult;
      }

      this._cacheTrackedUserReceivedPayload(signUpResult.username, signUpResponse.tokenValue, givenEmail);

      // Remember that the user is logged in.
      this.isLoggedIn = true;

      return true;
    } catch (error) {
      let errMessage = error.message;
      console.log(errMessage);
    }
  },

  _cacheTrackedUserReceivedPayload(receivedUsername, receivedTokenValue, email) {
    // Cache the JWT token.
    if (receivedTokenValue) {
      this.jwtToken = receivedTokenValue;
      authCache.saveJWT(receivedTokenValue);
    }

    // Remember the user's information.
    this.username = receivedUsername;
    this._rememberTheTrackedUser(email);
  },

  _rememberTheGuest(displayName = "Guest") {
    let foundGuestInfo = guestInfoCache.getGuestInfo();
    if (foundGuestInfo) {
      this.displayName = foundGuestInfo.displayName;
    } else {
      this.displayName = displayName;
    }
  },

  _rememberTheTrackedUser(email) {
    this.email = email;

    this.displayName = this.username;

    // Save the user info to the cache
    userCache.saveUserInfo({
      username: this.username,
      email: this.email
    });
  },

  _forgetAllYouHave() {
    authCache.clearJWT();
    userCache.clearUserInfo();
    guestInfoCache.clearGuestInfo();
  },

  _isUsernameInGuestIdFormat(username) {
    // Check if the username is in the format of a guestId. (e.g. guest_123456789)
    if (!username || typeof username !== 'string') {
      return false;
    }

    return (username.substring(0, 6) === 'guest_');
  }
};

export default Auth;