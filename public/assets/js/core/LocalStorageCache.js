class LocalStorageCache {
  static fetch() {
    let playerMe = this.getStorageJSON('playerMe');
    let playerOpponent = this.getStorageJSON('playerOpponent');
    let gameStatus = this.getStorageJSON('gameStatus');

    return {
      playerMe, playerOpponent, gameStatus
    };
  }

  static saveGame(playerMe, playerOpponent, gameStatus) {
    this.setStorageJSON('playerMe', playerMe);
    this.setStorageJSON('playerOpponent', playerOpponent);
    this.setStorageJSON('gameStatus', gameStatus);
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