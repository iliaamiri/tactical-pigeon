const database = require('./database');

const databaseConfig = {databaseInstance: database};

const {init: playerEntity} = require('./entities/player');
const {init: pigeonEntity} = require('./entities/pigeon');
const {init: pigeonTypeEntity} = require('./entities/pigeonType');
const {init: playerPigeonEntity} = require('./entities/playerPigeon');

const entities = {
  playerEntity,
  pigeonEntity,
  pigeonTypeEntity,
  playerPigeonEntity
};

for (let entityName in entities) {
  entities[entityName] = entities[entityName].bind(databaseConfig)();
}

console.log(entities)


module.exports = entities;