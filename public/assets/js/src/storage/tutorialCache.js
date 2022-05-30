import Cookie from "../helpers/Cookie.js";

const tutorialCache = {
  tutorialCacheKey: 'tutorial',

  checkTutorial() {
    Cookie.set(this.tutorialCacheKey, "true");
  },

  haveSeenTutorial() {
    return Cookie.get(this.tutorialCacheKey) === "true";
  },

  clearTutorial() {
    Cookie.destroy(this.tutorialCacheKey);
  }
};

export default tutorialCache;