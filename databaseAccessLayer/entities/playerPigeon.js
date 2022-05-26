const {tableName: playerTableName} = require('./player');
const {tableName: pigeonTableName} = require('./pigeon');
const {tableName: pigeonTypeTableName} = require('./pigeonType');

const tableName = 'player_pigeon';

function init() {
  const database = this.databaseInstance;
  async function getPigeons(playerId) {
    let sqlSelectQuery =
      `SELECT 
        ${pigeonTableName}.hue_angle AS hue_angle,
        ${pigeonTypeTableName}.name AS name,
        ${pigeonTypeTableName}.asset_folder_path AS asset_folder_path
        FROM ${tableName} 
        INNER JOIN ${pigeonTableName} ON ${tableName}.pigeon_id = ${pigeonTableName}.pigeon_id
        INNER JOIN ${pigeonTypeTableName} ON ${pigeonTableName}.pigeon_type_id = ${pigeonTypeTableName}.pigeon_type_id
        WHERE ${tableName}.player_id = :player_id`;
    let params = {player_id: playerId};
    let result = await database.query(sqlSelectQuery, params);
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
    let result = await database.query(sqlSelectQuery, params);
    if (result && result.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async function getPlayerPigeon(playerId, pigeonId) {
    let sqlSelectQuery =
      `SELECT 
        ${playerTableName}.username AS username,
        ${playerTableName}.email AS email,
        ${playerTableName}.games_played AS games_played,
        ${playerTableName}.games_won AS games_won,
        ${playerTableName}.games_lost AS games_lost,
        ${pigeonTableName}.hue_angle AS hue_angle,
        ${pigeonTypeTableName}.name AS name,
        ${pigeonTypeTableName}.asset_folder_path AS asset_folder_path
        FROM ${tableName}
        INNER JOIN ${playerTableName} ON ${tableName}.player_id = ${playerTableName}.player_id
        INNER JOIN ${pigeonTableName} ON ${tableName}.pigeon_id = ${pigeonTableName}.pigeon_id
        INNER JOIN ${pigeonTypeTableName} ON ${pigeonTableName}.pigeon_type_id = ${pigeonTypeTableName}.pigeon_type_id
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

  async function addPlayerPigeon(playerId, pigeonId) {
    let sqlInsertQuery = `INSERT INTO ${tableName} (player_id, pigeon_id) VALUES (:player_id, :pigeon_id)`;
    let params = {
      player_id: playerId,
      pigeon_id: pigeonId
    };
    return database.query(sqlInsertQuery, params);
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
    deletePlayerPigeon
  }
}

module.exports = {init, tableName};