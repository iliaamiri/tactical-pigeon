import Cookie from '../../helpers/Cookie.js';

const Token = {
  jwtCookieKey: "JWT",
  usernameCookieKey: "user",

  tokenVal: null,

  username: "Player 1",

  save(tokenValue, username) {
    Cookie.set(this.jwtCookieKey, tokenValue);
    Cookie.set(this.usernameCookieKey, username);
    this.username = username;
    this.tokenVal = tokenValue;
  },

  fetchCachedToken() {
    let foundJWTCookie = Cookie.get(this.jwtCookieKey);
    if (!foundJWTCookie) {
      this.tokenVal = null;
      return null;
    }

    let foundUsername = Cookie.get(this.usernameCookieKey);
    if (foundUsername) {
      this.username = foundUsername;
    }

    this.tokenVal = foundJWTCookie;
    return foundJWTCookie;
  },

  isAuthenticated() {
      this.fetchCachedToken();
      return !!this.tokenVal;
  },

  destroySession() {
    Cookie.destroy(this.jwtCookieKey);
    this.tokenVal = null;
  }
};

export default Token;