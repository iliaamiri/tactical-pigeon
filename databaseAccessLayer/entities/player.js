const tableName = "player";

function init() {
  const {tableName: playerPigeonTableName} = require('./playerPigeon');
  const {tableName: pigeonTableName} = require('./pigeon');
  const {tableName: pigeonTypeTableName} = require('./pigeonType');

  const database = this.databaseInstance;

  async function getAllUsers() {
    let sqlQuery = `SELECT * FROM ${tableName}`;

    return database.query(sqlQuery);
  }

  async function getSelectedPigeon(playerId) {
    let sqlSelectQuery =
      `SELECT
        ${pigeonTableName}.pigeon_id AS pigeon_id,
        ${pigeonTypeTableName}.pigeon_type_id AS pigeon_type_id,
        ${pigeonTableName}.hue_angle AS hue_angle,
        ${pigeonTypeTableName}.name AS name,
        ${pigeonTypeTableName}.asset_folder_path AS asset_folder_path      
      FROM ${tableName}
      INNER JOIN ${playerPigeonTableName} ON ${tableName}.selected_pigeon = ${playerPigeonTableName}.player_pigeon_id
      INNER JOIN ${pigeonTableName} ON ${playerPigeonTableName}.pigeon_id = ${pigeonTableName}.pigeon_id
      INNER JOIN ${pigeonTypeTableName} ON ${pigeonTableName}.pigeon_type_id = ${pigeonTypeTableName}.pigeon_type_id
      WHERE ${tableName}.player_id = :player_id`;

    let params = {player_id: playerId};

    let [result] = await database.query(sqlSelectQuery, params);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async function updateSelectedPigeon(playerId, playerPigeonId) {
    let sqlUpdateQuery =
      `UPDATE ${tableName}
      SET selected_pigeon = :selected_pigeon
      WHERE player_id = :player_id`;

    let params = {
      selected_pigeon: playerPigeonId,
      player_id: playerId
    };

    return database.query(sqlUpdateQuery, params);
  }


  async function getUserByEmail(email) {
    let sqlQuery = `SELECT player_id, email, username, password_hash, password_salt, games_played, games_won, games_lost FROM ${tableName} WHERE email = :email`;
    let params = {
      email: email,
    };
    return database.query(sqlQuery, params);
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
      sqlUpdateQuery += `games_won = games_won + 1`;
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
    addUser,
    updateGameStatsById,
    incrementGameStatsById,
    deleteUser,
    getSelectedPigeon
  };
}

module.exports = {init, tableName};