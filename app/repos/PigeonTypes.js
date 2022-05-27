const database = require("../../databaseAccessLayer");

const PigeonType = require("../models/PigeonType");

const PigeonTypes = {
  async fetchAll() {
    const allPigeonTypes = await database.pigeonTypeEntity.getAll();
    const result = [];
    for (let i = 0; i < allPigeonTypes.length; i++) {
      let pigeonTypeRow = allPigeonTypes[i];
      const pigeonTypeObject = Object.create(PigeonType);
      pigeonTypeObject.initExistingPigeonType(pigeonTypeRow.pigeon_type_id, pigeonTypeRow.name, pigeonTypeRow.asset_folder_path);
      result.push(pigeonTypeObject);
    }

    return result;
  }
};

module.exports = PigeonTypes;