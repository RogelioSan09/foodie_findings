import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Recipe extends Model {}

Recipe.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        image: {
        type: DataTypes.IMAGE,
        allowNull: false,
        },
        sourceURL: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        readyInMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);
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

export default Recipe;