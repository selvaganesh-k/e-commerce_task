const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER(3),
        autoIncrement: true,
        primaryKey: true,
    },
    productName: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 25]
        }
    },
    fullPrice: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        validate: {
            len: [2, 5]
        }
    },
    reducePrice: {
        type: DataTypes.INTEGER(5),
        defaultValue: false,
        validate: {
            len: [2, 5]
        }
    },
    productDes: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [20, 2000]
        }
    },
    availableKilograms: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        validate: {
            min: 5
        },
    },
    forSale: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    imagePaths: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    deliveryCharge: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'products',
    timestamps: true,
    hooks: {
        beforeCreate: (product) => {
            product.imagePaths = JSON.stringify(product.imagePaths);
        },
        beforeUpdate: (product) => {
            product.imagePaths = JSON.stringify(product.imagePaths);
        },
        afterFind: (products) => {
            if (Array.isArray(products)) {
                products.forEach(product => {
                    product.imagePaths = JSON.parse(product.imagePaths);
                });
            } else if (products) {
                products.imagePaths = JSON.parse(products.imagePaths);
            }
        },
    },
});

module.exports = product;
