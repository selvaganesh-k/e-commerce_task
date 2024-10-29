const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER(3),
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    productid: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER(8),
        allowNull: false
    },
}, {
    tableName: 'carts',
    timestamps: true,
});

module.exports = cart;
