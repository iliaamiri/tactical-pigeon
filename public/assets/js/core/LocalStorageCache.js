class LocalStorageCache {
  static fetch() {
    let playerMe = this.getStorageJSON('playerMe');
    let playerOpponent = this.getStorageJSON('playerOpponent');
    let gameComplete = this.getStorageJSON('gameComplete');

    return {
      playerMe, playerOpponent, gameComplete
    };
  }

  static saveGame(playerMe, playerOpponent, gameComplete) {
    this.setStorageJSON('playerMe', playerMe);
    this.setStorageJSON('playerOpponent', playerOpponent);
    this.setStorageJSON('gameComplete', gameComplete);
  }

  static getStorageJSON(key) {
    let value = localStorage.getItem(key);
    if (!value)
      return null;
    return JSON.parse(value);
  }

  static setStorageJSON(key, value) {
    let stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }
}

export default LocalStorageCache;