import Cookie from '../../helpers/Cookie.js';

const Token  = {
    cookieKey: "JWT",

    tokenVal: null,

    save(tokenValue) {
        Cookie.set(this.cookieKey, tokenValue);
        this.tokenVal = tokenValue;
    },

    fetchCachedToken() {
        let foundCookie = Cookie.get(this.cookieKey);
        if (!foundCookie) {
            this.tokenVal = null;
            return null;
        }

        this.tokenVal = foundCookie;
        return foundCookie;
    },

    destroySession() {
        Cookie.destroy(this.cookieKey);
        this.tokenVal = null;
    }
};

export default Token;