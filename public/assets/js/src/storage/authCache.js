import StorageCache from "./StorageCache.js";
import Cookie from "../helpers/Cookie.js";

const authCache = {
  jwtKeyName: "JWT",

  saveJWT(jwt) {
    StorageCache.addStorageItem(this.jwtKeyName, jwt);
    Cookie.set(this.jwtKeyName, jwt);
  },

  fetchJWT() {
    return StorageCache.getStorageItem(this.jwtKeyName) || Cookie.get(this.jwtKeyName);
  },

  updateJWT(jwt) {
    StorageCache.addStorageItem(this.jwtKeyName, jwt);
    Cookie.set(this.jwtKeyName, jwt);
  },

  clearJWT() {
    StorageCache.removeStorageItem(this.jwtKeyName);
    Cookie.destroy(this.jwtKeyName);
  }
};

export default authCache;