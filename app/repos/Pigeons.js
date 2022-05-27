const database = require("../../databaseAccessLayer");

const Pigeons = {
  async fetchAll(Pigeon) {
    const allPigeons = await database.pigeonEntity.getAll();
    const result = [];
    for (let i = 0; i < allPigeons.length; i++) {
      let pigeonRow = allPigeons[i];
      let pigeonObject = Object.create(Pigeon);
      pigeonObject.initExistingPigeon(pigeonRow.pigeon_id, pigeonRow.name, pigeonRow.asset_folder_path);
      result.push(pigeonObject);
    }

    return result;
  }
};

module.exports = Pigeons;