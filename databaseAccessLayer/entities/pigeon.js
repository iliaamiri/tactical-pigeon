const tableName = "pigeon";

function init() {
  const {tableName: pigeonTypeTableName} = require('./pigeonType');

  const database = this.databaseInstance;
  async function findByPK(pigeonId) {
    let sqlSelectQuery =
      `SELECT
        ${tableName}.pigeon_id AS pigeon_id,
        ${tableName}.pigeon_type_id AS pigeon_type_id,
        ${tableName}.hue_angle AS hue_angle,
        ${pigeonTypeTableName}.asset_folder_path AS asset_folder_path
        FROM ${tableName}
         INNER JOIN ${pigeonTypeTableName} ON ${tableName}.pigeon_type_id = ${pigeonTypeTableName}.pigeon_type_id
         WHERE ${tableName}.pigeon_id = :pigeon_id`;

    let params = {pigeon_id: pigeonId};

    let [result] = await database.query(sqlSelectQuery, params);

    if (result && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  async function addNewPigeon(pigeonTypeId, hueAngle) {
    let sqlInsertQuery = `INSERT INTO ${tableName} (hue_angle, pigeon_type_id) VALUES (:hue_angle, :pigeon_type_id)`;

    let params = {
      hue_angle: hueAngle,
      pigeon_type_id: pigeonTypeId
    };

    const [result] = database.query(sqlInsertQuery, params);
    return result;
  }

  async function updatePigeon(pigeonId, hueAngle, pigeonTypeId = null) {
    let sqlUpdateQuery = `UPDATE ${tableName} SET hue_angle = :hue_angle`;

    let params = { hue_angle: hueAngle, pigeon_id: pigeonId };

    if (pigeonTypeId) {
      sqlUpdateQuery += `, pigeon_type_id = :pigeon_type_id`;
      params.pigeon_type_id = pigeonTypeId;
    }

    sqlUpdateQuery += ` WHERE pigeon_id = :pigeon_id`;

    return database.query(sqlUpdateQuery, params);
  }

  async function deletePigeonById(pigeonId) {
    let sqlDeleteQuery = `DELETE FROM ${tableName} WHERE pigeon_id = :pigeon_id`;

    let params = { pigeon_id: pigeonId};

    return database.query(sqlDeleteQuery, params);
  }

  return {
    findByPK,
    addNewPigeon,
    updatePigeon,
    deletePigeonById
  }
}
module.exports = {init, tableName};