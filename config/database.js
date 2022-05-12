const dotenv = require('dotenv');
dotenv.config();

// development
const sqlDbConfigDev = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || "3306",
  database: process.env.DB_NAME || "database_name"
}

// production - read-only and only for user table
const sqlDbConfig_readOnlyUser = {
  host: "localhost",
  username: "user_only_read",
  password: "user_only_read",
  port: "3306",
  database: process.env.DB_NAME || "database_name"
}

// ... more

module.exports = {
  sqlDbConfigDev,
  sqlDbConfig_readOnlyUser
}