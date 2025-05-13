const express = require('express');
const router = express.Router();
const {
  getInventoryFromTable,
  calculateInventoryFromMovements,
  getInventoryByProductId
} = require('../controllers/inventoryController');

// 📦 Get inventory directly from the Inventory table
// GET /inventory/table
router.get('/table', getInventoryFromTable);

// 📊 Calculate inventory based on StockMovement table
// GET /inventory/calculated
router.get('/calculated', calculateInventoryFromMovements);

// 🔍 Get inventory for a specific product by productId
// GET /inventory/:productId
router.get('/:productId', getInventoryByProductId);

module.exports = router;
