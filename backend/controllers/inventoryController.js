const Inventory = require('../models/Inventory');
const StockMovement = require('../models/StockMovement');
const Product = require('../models/Product');
const { Sequelize } = require('sequelize');

// ✅ Option 1: Read directly from Inventory table
const getInventoryFromTable = async (req, res) => {
  try {
    const inventories = await Inventory.findAll({
      include: {
        model: Product,
        attributes: ['id', 'name', 'sku']
      }
    });

    res.status(200).json({ count: inventories.length, data: inventories });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Failed to fetch inventory', error: error.message });
  }
};

// ✅ Option 2: Calculate inventory from StockMovement table
const calculateInventoryFromMovements = async (req, res) => {
  try {
    const results = await StockMovement.findAll({
      attributes: [
        'productId',
        [Sequelize.literal(`
          SUM(CASE WHEN type = 'in' THEN quantity ELSE 0 END) - 
          SUM(CASE WHEN type = 'out' THEN quantity ELSE 0 END)
        `), 'currentStock']
      ],
      group: ['productId'],
      include: {
        model: Product,
        attributes: ['id', 'name', 'sku']
      }
    });

    res.status(200).json({ count: results.length, data: results });
  } catch (error) {
    console.error('Error calculating inventory:', error);
    res.status(500).json({ message: 'Failed to calculate inventory', error: error.message });
  }
};

// ✅ Optional: Get inventory for a specific product
const getInventoryByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    const inventory = await Inventory.findOne({
      where: { productId },
      include: {
        model: Product,
        attributes: ['id', 'name', 'sku']
      }
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found for this product' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory by productId:', error);
    res.status(500).json({ message: 'Failed to fetch inventory', error: error.message });
  }
};

module.exports = {
  getInventoryFromTable,
  calculateInventoryFromMovements,
  getInventoryByProductId
};
