const { Model } = require("sequelize/types");
const { DataTypes } = require("sequelize");
const {
    sequelizeDev, // only for dev purposes
    sequelizeReadOnlyUser // for production
} = require("../../core/database")


class User extends Model {}

User.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    sequelize: sequelizeDev, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});