// models/Inventory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const Inventory = sequelize.define('Inventory', {
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Inventory.belongsTo(Product, { foreignKey: 'productId' });
Product.hasOne(Inventory, { foreignKey: 'productId' });

module.exports = Inventory;
