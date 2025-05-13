// models/StockMovement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const StockMovement = sequelize.define('StockMovement', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM('in', 'out'), allowNull: false },
  notes: { type: DataTypes.STRING }
});

StockMovement.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(StockMovement, { foreignKey: 'productId' });

module.exports = StockMovement;
