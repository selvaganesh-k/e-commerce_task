const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ofurits', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;