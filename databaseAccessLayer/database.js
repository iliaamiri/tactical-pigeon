const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
  host: "eyvqcfxf5reja3nv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "cf93jnxntj6xyqx8",
  password: "uuqy7o1grxsa5tx9",
  database: "t0t5f35zhr193gam",
  multipleStatements: false,
  namedPlaceholders: true
};

const dbConfigLocal = {
  host: "eyvqcfxf5reja3nv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "cf93jnxntj6xyqx8",
  password: "uuqy7o1grxsa5tx9",
  database: "t0t5f35zhr193gam",
  multipleStatements: false,
  namedPlaceholders: true
};

let database;
if (is_heroku) {
  database = mysql.createPool(dbConfigHeroku).promise();
}
else {
  database = mysql.createPool(dbConfigLocal).promise();
}

module.exports = database;