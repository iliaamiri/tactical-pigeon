const database = require("../../databaseAccessLayer");

const PigeonType = require("./PigeonType");

const Pigeon = {
  _pigeonId: null,
  pigeonTypeId: null,
  pigeonType: null,

  hueAngle: null,

  async fetchInstance(pigeonId) {
    const result = await database.pigeonEntity.findByPK(pigeonId);
    if (!result) {
      return null;
    }
    this.pigeonType = Object.create(PigeonType);
    this.pigeonType.initExistingPigeonType(result['pigeon_type_id'], result['name'], result['asset_folder_path']);
    this.initExistingPigeon(result['pigeon_id'], result['pigeon_type_id'], result['hue_angle']);
    return this;
  },

  initNewPigeon(pigeonTypeId, hueAngle) {
    this.pigeonTypeId = pigeonTypeId;
    this.hueAngle = hueAngle;
  },

  initExistingPigeon(pigeonId, pigeonTypeId, hueAngle) {
    this._pigeonId = pigeonId;
    this.pigeonTypeId = pigeonTypeId;
    this.hueAngle = hueAngle;
  },

  updateHueAngle(hueAngle) {
    if (typeof hueAngle !== "string") {
      throw new Error("Hue Angle must be a string. Check your code logic.");
    }
    this.hueAngle = hueAngle;
  },

  async save() {
    if (this._pigeonId) { // Update
      return await this._updateToDatabase();
    } else { // Insert
      return await this._addToDatabase();
    }
  },

  async _updateToDatabase() {
    return await database.pigeonEntity.updatePigeon(this._pigeonId, this.pigeonTypeId, this.hueAngle);
  },

  async _addToDatabase() {
    const result = await database.pigeonEntity.addNewPigeon(this.pigeonTypeId, this.hueAngle);
    this._pigeonId = result.insertId;
    return result;
  },

  async delete() {
    return await database.pigeonEntity.deletePigeonById(this._pigeonId);
  },

  getPigeonId() {
    return this._pigeonId;
  },

  setPigeonTypeId(pigeonTypeId) {
    this.pigeonTypeId = pigeonTypeId;
  },

  getPigeonTypeId() {
    return this.pigeonTypeId;
  },

  getHueAngle() {
    return this.hueAngle;
  },

  setHueAngle(hueAngle) {
    this.hueAngle = hueAngle;
  },

  toJSON() {
    return {
      pigeonType: this.pigeonType?.toJSON(),
      hueAngle: this.hueAngle
    };
  }
};

module.exports = Pigeon;