const mysql = require('mysql2/promise');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
  host: "m7az7525jg6ygibs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "g66rt19rm7km7cem",
  password: "x7bz1gh98h9czovm",
  database: "km8vhbuynd31zsfh",
  multipleStatements: false,
  namedPlaceholders: true
};

const dbConfigLocal = {
  host: "localhost",
  user: "root",
  password: "Password",
  database: "lab_example",
  multipleStatements: false,
  namedPlaceholders: true
};

let database;
if (is_heroku) {
  database = mysql.createPool(dbConfigHeroku);
}
else {
  database = mysql.createPool(dbConfigLocal);
}

module.exports = database;