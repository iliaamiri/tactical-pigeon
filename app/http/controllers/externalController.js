const database = include("databaseAccessLayer");

const PigeonTypes = require("../../repos/PigeonTypes");

const ExternalController = {
  async jsCommonVars(req, res) {
    const allPigeonTypes = await PigeonTypes.fetchAll();

    String.prototype.toCamelCase = function() {
      return this
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    };

    let result = `const JS_CV = {`;
    result += `pigeonsFolderPaths: {`;
    for (let i = 0; i < allPigeonTypes.length; i++) {
      let pigeonType = allPigeonTypes[i];
      let pigeonTypeName = pigeonType.getName().toCamelCase();
      let pigeonTypeAssetFolderPath = `${pigeonType.getAssetFolderPath()}`;
      result += `${pigeonTypeName}: '${pigeonTypeAssetFolderPath}',`;
    }
    result += `},`;

    result += `};`
    res.end(result);
  },
}

module.exports = ExternalController;