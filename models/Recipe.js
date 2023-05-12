const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    readyInMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: false,
    modelName: 'recipe'
})

module.exports = Recipe;