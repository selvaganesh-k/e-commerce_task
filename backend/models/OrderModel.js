const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER(3),
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            len: [3, 25]
        }
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate:{
            len:[5,40]
        }
      },
    phoneNo: {
        type: DataTypes.BIGINT,
        defaultValue: false,
        validate: {
            len: [10]
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [10,200]
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 2
        },
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalamount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderdProducts:{
        type: DataTypes.STRING,
        allowNull:false
    }

}, {
    tableName: 'orders',
    timestamps: true,
});

module.exports = order;
