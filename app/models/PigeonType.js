const database = require('../../databaseAccessLayer');

const PigeonType = {
  _pigeonTypeId: null,
  name: null,
  assetFolderPath: null,

  initNewPigeonType(name, assetFolderPath) {
    this.name = name;
    this.assetFolderPath = assetFolderPath;
  },

  initExistingPigeonType(pigeonTypeId, name, assetFolderPath) {
    this._pigeonTypeId = pigeonTypeId;
    this.name = name;
    this.assetFolderPath = assetFolderPath;
  },

  async save() {
    if (this._pigeonTypeId === null) {
      return await this._createNewInDatabase();
    } else {
      return await this._updateInDatabase();
    }
  },

  async _createNewInDatabase() {
    const result = await database.pigeonTypeEntity.createNewPigeonType(this.name, this.assetFolderPath);
    this._pigeonTypeId = result.insertId;
  },

  async _updateInDatabase() {
    await database.pigeonTypeEntity.updateById(this._pigeonTypeId, this.name, this.assetFolderPath);
  },

  async delete() {
    await database.pigeonTypeEntity.deleteById(this._pigeonTypeId);
  },

  getPigeonTypeId() {
    return this._pigeonTypeId;
  },

  getName() {
    return this.name;
  },

  getAssetFolderPath() {
    return this.assetFolderPath;
  },

  setPigeonTypeId(pigeonTypeId) {
    if (pigeonTypeId === null) {
      this._pigeonTypeId = pigeonTypeId;
    }
  },

  setName(name) {
    this.name = name;
  },

  setAssetFolderPath(assetFolderPath) {
    this.assetFolderPath = assetFolderPath;
  },

  toJSON() {
    return {
      name: this.name,
      assetFolderPath: this.assetFolderPath
    };
  }
};

module.exports = PigeonType;