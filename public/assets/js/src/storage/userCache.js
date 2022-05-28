import StorageCache from "./StorageCache.js";

const userCache = {
  userCacheKeyName: 'userInfo',

  saveUserInfo(userInfo) {
    if (!userInfo || !userInfo.username || !userInfo.email) {
      return;
    }
    StorageCache.setStorageJSON(this.userCacheKeyName, userInfo);
  },

  getUserInfo() {
    return StorageCache.getStorageJSON(this.userCacheKeyName);
  },

  updateUserInfo(newUserInfo) {
    this.saveUserInfo(newUserInfo);
  },

  clearUserInfo() {
    StorageCache.removeStorageItem(this.userCacheKeyName);
  }
};

export default userCache;