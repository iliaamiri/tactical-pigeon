class LocalStorageCache {
  static fetch() {
    let foundGame = this.getStorageJSON('currentGame');
    let players = this.getStorageJSON('players');
    let movesHistory = this.getStorageJSON('movesHistory');

    return {
      foundGame, players, movesHistory
    };
  }

  static getStorageJSON(key) {
    let value = localStorage.getItem(key);
    if (!value)
      return null;
    return JSON.parse(value);
  }
}

export default LocalStorageCache;