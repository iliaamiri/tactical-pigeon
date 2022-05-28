const StorageCache = {
  getStorageJSON(key) {
    let value = localStorage.getItem(key);
    if (!value)
      return null;
    return JSON.parse(value);
  },

  setStorageJSON(key, value) {
    let stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  },

  addStorageItem(key, item) {
    localStorage.setItem(key, item);
  },

  getStorageItem(key) {
    return localStorage.getItem(key);
  },

  removeStorageItem(key) {
    localStorage.removeItem(key);
  }
}

export default StorageCache;