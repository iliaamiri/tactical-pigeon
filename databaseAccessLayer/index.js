const database = require('./database');

const passwordPepper = "SeCretPeppa4MySal+";

let tableName = "player";

async function getAllUsers() {
  let sqlQuery = `SELECT * FROM ${tableName}`;
  return database.query(sqlQuery);
}

async function addUser(postData) {
  let sqlInsertQuery = `INSERT INTO ${tableName} (username, password_salt) VALUES (:username, sha2(UUID(),512));`;
  let params = {
    username: postData.username,
  };
  console.log(sqlInsertQuery);
  const [results] = await database.query(sqlInsertQuery, params);
  let insertedID = results.insertId;
  let updatePasswordHash = `UPDATE ${tableName} SET password_hash = sha2(concat(:password,:pepper,password_salt),512) WHERE player_id = :userId;`
  let params2 = {
    password: postData.password,
    pepper: passwordPepper,
    userId: insertedID
  }
  console.log(updatePasswordHash);
  return database.query(updatePasswordHash, params2);
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

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateGameStatsById,
  incrementGameStatsById
};