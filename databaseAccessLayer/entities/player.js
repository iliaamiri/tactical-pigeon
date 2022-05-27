const {tableName: playerPigeonTableName} = require("./playerPigeon");
const tableName = "player";

function init() {
  const {tableName: playerPigeonTableName} = require('./playerPigeon');
  const {tableName: pigeonTableName} = require('./pigeon');

  const database = this.databaseInstance;

  async function getAllUsers() {
    let sqlQuery = `SELECT * FROM ${tableName}`;

    return database.query(sqlQuery);
  }

  /**
   * Gets the pigeon from the player_pigeon table. This is because the player_pigeon table is a many-to-many table and
   * the player owns the pigeons in the player_pigeon table. This function is used to get the selected pigeon from the
   * player_pigeon table. The relation between player.selected_pigeon foreign key and the player_pigeon.pigeon_id is one-to-one.
   * @param playerId
   * @returns {Promise<null|*>}
   */
  async function getSelectedPigeon(playerId) {
    let sqlSelectQuery =
      `SELECT
        ${pigeonTableName}.pigeon_id AS pigeon_id,
        ${playerPigeonTableName}.hue_angle AS hue_angle,
        ${pigeonTableName}.name AS name,
        ${pigeonTableName}.asset_folder_path AS asset_folder_path      
      FROM ${tableName}
      INNER JOIN ${playerPigeonTableName} ON ${tableName}.selected_pigeon = ${playerPigeonTableName}.player_pigeon_id
      INNER JOIN ${pigeonTableName} ON ${playerPigeonTableName}.pigeon_id = ${pigeonTableName}.pigeon_id
      WHERE ${tableName}.player_id = :player_id`;

    let params = {player_id: playerId};

    let [result] = await database.query(sqlSelectQuery, params);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  /**
   * Updates the selected_pigeon foreign key in the player table.
   * @param playerId
   * @param pigeonId
   */
  async function updateSelectedPigeon(playerId, pigeonId) {
    let sqlSelectQuery =
      `SELECT 
        player_pigeon_id
       FROM ${playerPigeonTableName}
        WHERE player_id = :player_id AND pigeon_id = :pigeon_id`;

    let selectParams = {player_id: playerId, pigeon_id: pigeonId};

    let [resultPlayerPigeonId] = await database.query(sqlSelectQuery, selectParams);
    if (!resultPlayerPigeonId || resultPlayerPigeonId.length < 1) {
      throw new Error("The player does not own the pigeon.");
    } else {
      resultPlayerPigeonId = resultPlayerPigeonId[0].player_pigeon_id;
    }

    let sqlUpdateQuery =
      `UPDATE ${tableName}
      SET selected_pigeon = :selected_pigeon
      WHERE player_id = :player_id`;

    let updateParams = {
      selected_pigeon: resultPlayerPigeonId,
      player_id: playerId
    };

    return database.query(sqlUpdateQuery, updateParams);
  }


  async function getUserByEmail(email) {
    let sqlQuery = `SELECT * FROM ${tableName} WHERE email = :email`;
    let params = {
      email: email,
    };
    const [result] = await database.query(sqlQuery, params);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async function getUserById(player_id) {
    let sqlQuery = `SELECT * FROM ${tableName} WHERE player_id = :player_id`;
    let params = {
      player_id: player_id,
    };
    const [result] = await database.query(sqlQuery, params);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async function addUser(postData) {
    let sqlInsertQuery = `INSERT INTO ${tableName} (email, username, password_hash, password_salt) VALUES (:email, :username, :password_hash, :password_salt);`;
    let params = {
      email: postData.email,
      username: postData.username,
      password_hash: postData.hash,
      password_salt: postData.salt,
    };
    console.log(sqlInsertQuery);
    return database.query(sqlInsertQuery, params);
    /* console.log('results:', results);
    let insertedID = results.insertId; */
    /* let updatePasswordHash = `UPDATE ${tableName} SET password_hash = sha2(concat(:password,:pepper,password_salt),512) WHERE player_id = :userId;`
    let params2 = {
      password: postData.password,
      pepper: passwordPepper,
      userId: insertedID
    }
    console.log('updatePasswordHash:', updatePasswordHash); */
    // return database.query(updatePasswordHash, params2);
  }

  async function updateGameStatsById(playerId, newGameStats) {
    const {gamesPlayed, gamesWon, gamesLost} = newGameStats;
    let sqlUpdateQuery = `UPDATE ${tableName} SET games_played = :games_played, games_won = :games_won, games_lost = :games_lost WHERE player_id = :player_id`;
    let params = {
      player_id: playerId,
      games_played: gamesPlayed,
      games_won: gamesWon,
      games_lost: gamesLost,
    };
    return database.query(sqlUpdateQuery, params);
  }

  async function incrementGameStatsById(playerId, gameResult) {
    let sqlUpdateQuery = `UPDATE ${tableName} SET games_played = games_played + 1, `;
    if (gameResult === "won") {
      sqlUpdateQuery += `games_won = games_won + 1`;
    }
    if (gameResult === "lost") {
      sqlUpdateQuery += `games_won = games_lost + 1`;
    }
    sqlUpdateQuery += ` WHERE player_id = :player_id`;

    return database.query(sqlUpdateQuery, {player_id: playerId});
  }

  async function deleteUser(playerId) {
    let sqlDeleteQuery = `DELETE FROM ${tableName} WHERE player_id = :userID`;
    let params = {
      userID: playerId
    };
    console.log(sqlDeleteQuery);
    return database.query(sqlDeleteQuery, params);
  }

  return {
    getAllUsers,
    getUserByEmail,
    getUserById,
    addUser,
    updateGameStatsById,
    incrementGameStatsById,
    deleteUser,
    getSelectedPigeon,
    updateSelectedPigeon
  };
}

module.exports = {init, tableName};