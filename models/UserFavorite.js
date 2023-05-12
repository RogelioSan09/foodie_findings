import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class UserFavorite extends Model {}

UserFavorite.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  favorite_id: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'userFavorite'
})

export default UserFavorite;