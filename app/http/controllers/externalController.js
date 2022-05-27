const database = include("databaseAccessLayer");

// Models
const Pigeon = require("../../models/Pigeon");

// Repos
const Pigeons = require("../../repos/Pigeons");

const ExternalController = {
  async jsCommonVars(req, res) {
    const allPigeons = await Pigeons.fetchAll(Pigeon);

    String.prototype.toCamelCase = function() {
      return this
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    };

    let result = `const JS_CV = {`;
    result += `pigeonsFolderPaths: {`;
    for (let i = 0; i < allPigeons.length; i++) {
      let pigeon = allPigeons[i];
      let pigeonName = pigeon.getName().toCamelCase();
      let pigeonAssetFolderPath = `${pigeon.getAssetFolderPath()}`;
      result += `${pigeonName}: '${pigeonAssetFolderPath}',`;
    }
    result += `},`;

    result += `};`
    res.end(result);
  },
}

module.exports = ExternalController;