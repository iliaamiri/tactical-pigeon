const tableName = "pigeon_type";

function init() {
  const database = this.databaseInstance;
  async function getAll() {
    let sqlSelectQuery = `SELECT * FROM ${tableName}`;
    let [result] = await database.query(sqlSelectQuery);

    if (result && result.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async function findByPK(pigeonTypeId) {
    let sqlSelectQuery = `SELECT * FROM ${tableName} WHERE pigeon_type_id = :pigeon_type_id`;

    let params = { pigeon_type_id: pigeonTypeId };

    let [result] = await database.query(sqlSelectQuery, params);

    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async function findByName(name) {
    let sqlSelectQuery = `SELECT * FROM ${tableName} WHERE name = :name`;

    let params = { name: name };

    let [result] = await database.query(sqlSelectQuery, params);

    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async function createNewPigeonType(name, assetFolderPath) {
    let sqlInsertQuery = `INSERT INTO ${tableName} (name, asset_folder_path) VALUES (:name, :asset_folder_path)`;

    let params = { name: name, asset_folder_path: assetFolderPath };

    let [result] = await database.query(sqlInsertQuery, params);

    return result;
  }

  async function updateById(pigeonTypeId, name, assetFolderPath = null) {
    let sqlUpdateQuery = `UPDATE ${tableName} SET name = :name`;

    let params = {
      pigeon_type_id: pigeonTypeId,
      name: name
    };

    if (assetFolderPath) {
      sqlUpdateQuery += `, asset_folder_path = :asset_folder_path`;
      params.asset_folder_path = assetFolderPath;
    }

    sqlUpdateQuery += ` WHERE pigeon_type_id = :pigeon_type_id`;

    return database.query(sqlUpdateQuery, params);
  }

  async function deleteById(pigeonTypeId) {
    let sqlDeleteQuery = `DELETE FROM ${tableName} WHERE pigeon_type_id = :pigeon_type_id`;

    let params = { pigeon_type_id: pigeonTypeId };

    return database.query(sqlDeleteQuery, params);
  }

  return {
    getAll,
    findByPK,
    findByName,
    createNewPigeonType,
    updateById,
    deleteById
  };
}
module.exports = {init, tableName};