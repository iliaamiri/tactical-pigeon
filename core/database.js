const {
  sqlDbConfigDev,
  sqlDbConfig_readOnlyUser
} = require('../config/database');

const {Sequelize} = require('sequelize');

// different sequalize instances using different configs
const sequelizeDev = new Sequelize(sqlDbConfigDev);
const sequelizeReadOnlyUser = new Sequelize(sqlDbConfig_readOnlyUser);

module.exports = {
  sequelizeDev,
  sequelizeReadOnlyUser
};
