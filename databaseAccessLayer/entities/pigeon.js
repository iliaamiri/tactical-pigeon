const tableName = "pigeon";

function init() {

  const database = this.databaseInstance;

  async function getAll() {
    let sqlSelectQuery = `SELECT * FROM ${tableName}`;
    let [result] = await database.query(sqlSelectQuery);
    if (result.length === 0) {
      return [];
    } else {
      return result;
    }
  }

  async function countAll() {
    let sqlSelectQuery = `SELECT COUNT(*) AS count FROM ${tableName}`;
    let [result] = await database.query(sqlSelectQuery);
    if (result && result.length > 0) {
      return result[0].count;
    } else {
      return 0;
    }
  }

  /**
   * Find a pigeon by its id. Note: this query will not return the hue_angle. hue_angle is only returned when the pigeon is owned by a player.
   * @param pigeonId
   * @returns {Promise<*>}
   */
  async function findByPK(pigeonId) {
    let sqlSelectQuery =
      `SELECT
        *
        FROM ${tableName}
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

  /**
   * Finds a pigeon from the pigeon table by its name.
   * @param givenName
   * @returns {Promise<void>}
   */
  async function findByPigeonName(givenName) {
    let sqlSelectQuery = `SELECT * FROM ${tableName} WHERE name = :name`;
    let params = {name: givenName};
    let [result] = await database.query(sqlSelectQuery, params);
    if (result && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
  }

  /**
   * Insert a new pigeon into the database. Only takes name and asset_folder_path.
   * @param name
   * @param assetFolderPath
   * @returns {Promise<*>}
   */
  async function addNewPigeon(name, assetFolderPath) {
    let sqlInsertQuery = `INSERT INTO ${tableName} (name, asset_folder_path) VALUES (:name, :asset_folder_path)`;

    let params = {
      name: name,
      asset_folder_path: assetFolderPath
    };

    const [result] = await database.query(sqlInsertQuery, params);
    return result;
  }

  /**
   * Update a pigeon's name and asset_folder_path by their id.
   * the newAssetFolderPath is optional. It won't be updated unless it is filled.
   * @param pigeonId
   * @param newName
   * @param newAssetFolderPath
   */
  async function updatePigeon(pigeonId, newName, newAssetFolderPath = null) {
    let sqlUpdateQuery = `UPDATE ${tableName} SET newName = :new_name`;

    let params = { new_name: newName, pigeon_id: pigeonId };

    if (newAssetFolderPath) {
      sqlUpdateQuery += `, asset_folder_path = :asset_folder_path`;
      params.asset_folder_path = newAssetFolderPath;
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
    getAll,
    countAll,
    findByPK,
    addNewPigeon,
    updatePigeon,
    deletePigeonById
  }
}
module.exports = {init, tableName};