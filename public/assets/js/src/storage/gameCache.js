import StorageCache from "./StorageCache.js";

const gameCache = {
  fetch() {
    let playerMe = StorageCache.getStorageJSON('playerMe');
    let playerOpponent = StorageCache.getStorageJSON('playerOpponent');
    let gameComplete = StorageCache.getStorageJSON('gameComplete');

    return {
      playerMe, playerOpponent, gameComplete
    };
  },

  saveGame(playerMe, playerOpponent, gameComplete) {
    StorageCache.setStorageJSON('playerMe', playerMe);
    StorageCache.setStorageJSON('playerOpponent', playerOpponent);
    StorageCache.setStorageJSON('gameComplete', gameComplete);
  },
};

export default gameCache;