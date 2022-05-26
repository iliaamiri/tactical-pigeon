import Cookie from '../../helpers/Cookie.js';

const Token = {
  jwtCookieKey: "JWT",
  emailCookieKey: "email",
  usernameCookieKey: "user",
  guestIdCookieKey: "guestId",

  tokenVal: null,

  username: "Player 1",

  guestId: null,

  save(tokenValue) {
    Cookie.set(this.jwtCookieKey, tokenValue);
    this.tokenVal = tokenValue;
  },

  saveEmailAndUsername(email, username) {
    Cookie.set(this.emailCookieKey, email);
    Cookie.set(this.usernameCookieKey, username);
    this.username = username;
  },

  saveGuest(guestId) {
    Cookie.set(this.guestIdCookieKey, guestId);
    this.guestId = guestId;
  },

  fetchCachedUsernameOnly() {
    let foundUsername = Cookie.get(this.usernameCookieKey);
    if (foundUsername) {
      this.username = foundUsername;
      return foundUsername;
    }
    return null;
  },

  fetchCachedGuestId() {
    let foundGuestId = Cookie.get(this.guestIdCookieKey);
    if (foundGuestId) {
      this.guestId = foundGuestId;
      return foundGuestId;
    }
    return null;
  },

  fetchCachedToken() {
    let foundJWTCookie = Cookie.get(this.jwtCookieKey);
    if (!foundJWTCookie) {
      this.tokenVal = null;
      return null;
    }

    this.fetchCachedUsernameOnly();

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