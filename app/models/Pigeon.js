const database = require("../../databaseAccessLayer");

const Pigeon = {
  _pigeonId: null,
  name: null,
  assetFolderPath: null,

  hueAngle: null,

  async fetchInstance(pigeonId) {
    const result = await database.pigeonEntity.findByPK(pigeonId);
    if (!result) {
      return null;
    }
    this.initExistingPigeon(result['pigeon_id'], result['name'], result['asset_folder_path']);
    return this;
  },

  initNewPigeon(pigeonTypeId, name, assetFolderPath) {
    this.name = name;
    this.assetFolderPath = assetFolderPath;
  },

  initExistingPigeon(pigeonId, name, assetFolderPath) {
    this._pigeonId = pigeonId;
    this.name = name;
    this.assetFolderPath = assetFolderPath;
  },

  async save() {
    if (this._pigeonId) { // Update
      return await this._updateToDatabase();
    } else { // Insert
      return await this._addToDatabase();
    }
  },

  async _updateToDatabase() {
    return await database.pigeonEntity.updatePigeon(this._pigeonId, this.name, this.assetFolderPath);
  },

  async _addToDatabase() {
    const result = await database.pigeonEntity.addNewPigeon(this.name, this.assetFolderPath);
    this._pigeonId = result.insertId;
    return result;
  },

  async delete() {
    return await database.pigeonEntity.deletePigeonById(this._pigeonId);
  },

  getPigeonId() {
    return this._pigeonId;
  },

  getName() {
    return this.name;
  },

  getAssetFolderPath() {
    return this.assetFolderPath;
  },

  setPigeonName(newName) {
    this.name = newName;
  },

  setAssetFolderPath(newPath) {
    this.assetFolderPath = newPath;
  },

  setHueAngle(hueAngle) {
    if (hueAngle < 0 || hueAngle > 100) {
      throw new Error("Hue angle must be between 0 and 100");
    }
    this.hueAngle = hueAngle;
  },

  toJSON() {
    return {
      name: this.name,
      assetFolderPath: this.assetFolderPath,
      hueAngle: (this.hueAngle !== null) ? this.hueAngle : 0,
    };
  }
};

module.exports = Pigeon;