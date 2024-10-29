const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
    validate:{
        len:[5,40]
    }
  },
  password: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
