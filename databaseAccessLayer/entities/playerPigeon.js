const tableName = 'player_pigeon';

function init() {
  const {tableName: playerTableName} = require('./player');
  const {tableName: pigeonTableName} = require('./pigeon');

  const database = this.databaseInstance;
  async function getPigeons(playerId) {
    let sqlSelectQuery =
      `SELECT 
        ${pigeonTableName}.pigeon_id AS pigeon_id,
        ${tableName}.hue_angle AS hue_angle,
        ${pigeonTableName}.name AS name,
        ${pigeonTableName}.asset_folder_path AS asset_folder_path
        FROM ${tableName} 
        INNER JOIN ${pigeonTableName} ON ${tableName}.pigeon_id = ${pigeonTableName}.pigeon_id
        WHERE ${tableName}.player_id = :player_id`;
    let params = {player_id: playerId};
    let [result] = await database.query(sqlSelectQuery, params);
    if (result && result.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async function getPlayersWhoHaveThisPigeon(pigeonId) {
    let sqlSelectQuery =
      `SELECT
        ${playerTableName}.player_id AS player_id,
        ${playerTableName}.username AS username,
        ${playerTableName}.email AS email,
        ${playerTableName}.games_played AS games_played,
        ${playerTableName}.games_won AS games_won,
        ${playerTableName}.games_lost AS games_lost
        FROM ${tableName} 
        INNER JOIN ${playerTableName} ON ${tableName}.player_id = ${playerTableName}.player_id
        WHERE ${tableName}.pigeon_id = :pigeon_id`;
    let params = {pigeon_id: pigeonId};
    let [result] = await database.query(sqlSelectQuery, params);
    if (result && result.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  /**
   * Get the given player's pigeons
   * @param playerId
   * @param pigeonId
   * @returns {Promise<null|*>}
   */
  async function getPlayerPigeon(playerId, pigeonId) {
    let sqlSelectQuery =
      `SELECT 
        ${playerTableName}.username AS username,
        ${playerTableName}.email AS email,
        ${playerTableName}.games_played AS games_played,
        ${playerTableName}.games_won AS games_won,
        ${playerTableName}.games_lost AS games_lost,
        ${tableName}.hue_angle AS hue_angle,
        ${pigeonTableName}.name AS name,
        ${pigeonTableName}.asset_folder_path AS asset_folder_path
        FROM ${tableName}
        INNER JOIN ${playerTableName} ON ${tableName}.player_id = ${playerTableName}.player_id
        INNER JOIN ${pigeonTableName} ON ${tableName}.pigeon_id = ${pigeonTableName}.pigeon_id
        WHERE ${tableName}.player_id = :player_id AND ${tableName}.pigeon_id = :pigeon_id`;
    let params = {
      player_id: playerId,
      pigeon_id: pigeonId
    };
    let [result] = await database.query(sqlSelectQuery, params);

    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async function countPlayerPigeons(playerId) {
    let sqlSelectQuery = `SELECT COUNT(*) AS count FROM ${tableName} WHERE ${tableName}.player_id = :player_id`;
    let params = {player_id: playerId};
    let [result] = await database.query(sqlSelectQuery, params);
    if (result && result.length > 0) {
      return result[0].count;
    } else {
      return null;
    }
  }

  async function addPlayerPigeon(playerId, pigeonId) {
    let sqlInsertQuery = `INSERT INTO ${tableName} (player_id, pigeon_id) VALUES (:player_id, :pigeon_id)`;
    let params = {
      player_id: playerId,
      pigeon_id: pigeonId
    };
    return database.query(sqlInsertQuery, params);
  }

  async function updatePlayerPigeonHue(playerId, pigeonId, hueAngle) {
    let sqlUpdateQuery = `UPDATE ${tableName} SET hue_angle = :hue_angle WHERE player_id = :player_id AND pigeon_id = :pigeon_id`;
    let params = {
      player_id: playerId,
      pigeon_id: pigeonId,
      hue_angle: hueAngle
    };
    const [result] = await database.query(sqlUpdateQuery, params);
    if (result && result.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async function deletePlayerPigeon(playerId, pigeonId) {
    let sqlDeleteQuery = `DELETE FROM ${tableName} WHERE player_id = :player_id AND pigeon_id = :pigeon_id`;
    let params = {
      player_id: playerId,
      pigeon_id: pigeonId
    };
    return database.query(sqlDeleteQuery, params);
  }

  return {
    getPigeons,
    getPlayersWhoHaveThisPigeon,
    getPlayerPigeon,
    addPlayerPigeon,
    deletePlayerPigeon,
    countPlayerPigeons,
    updatePlayerPigeonHue
  }
}

module.exports = {init, tableName};