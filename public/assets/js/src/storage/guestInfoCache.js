import StorageCache from "./StorageCache.js";

const guestInfoCache = {
  guestInfoCacheKeyName: 'guestInfoCache',

  saveGuestInfo(guestInfo) {
    StorageCache.setStorageJSON(this.guestInfoCacheKeyName, guestInfo);
  },

  getGuestInfo() {
    return StorageCache.getStorageJSON(this.guestInfoCacheKeyName);
  },

  updateGuestInfo(guestInfo) {
    if (!guestInfo || !guestInfo.displayName || !guestInfo.guestId) {
      return;
    }
    this.saveGuestInfo(guestInfo);
  },

  clearGuestInfo() {
    StorageCache.removeStorageItem(this.guestInfoCacheKeyName);
  }
};

export default guestInfoCache;