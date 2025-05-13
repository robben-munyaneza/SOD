// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING }
});

// Foreign key relationship
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;
