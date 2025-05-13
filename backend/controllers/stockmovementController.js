const StockMovement = require('../models/StockMovement');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Create stock movement
exports.createStockMovement = async (req, res) => {
  try {
    const { productId, quantity, type, notes } = req.body;

    // 1. Create stock movement
    const stock = await StockMovement.create({ productId, quantity, type, notes });

    // 2. Find current inventory
    const inventory = await Inventory.findOne({ where: { productId } });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found for this product' });
    }

    // 3. Update quantity based on type
    const newQty = type === 'in'
      ? inventory.quantity + quantity
      : inventory.quantity - quantity;

    // 4. Update inventory
    await Inventory.update(
      { quantity: newQty },
      { where: { productId } }
    );

    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create stock movement', error: err.message });
  }
};

// Get all stock movements
exports.getAllStockMovements = async (req, res) => {
  try {
    const stocks = await StockMovement.findAll({ include: Product });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stock movements', error: err.message });
  }
};

// Get stock movement by ID
exports.getStockMovementById = async (req, res) => {
  try {
    const stock = await StockMovement.findByPk(req.params.id, { include: Product });
    if (!stock) return res.status(404).json({ message: 'Stock movement not found' });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stock movement', error: err.message });
  }
};

// Update stock movement (Optional: logic can be added to update inventory if needed)
exports.updateStockMovement = async (req, res) => {
  try {
    const stock = await StockMovement.findByPk(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock movement not found' });

    await stock.update(req.body);

    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update stock movement', error: err.message });
  }
};

// Delete stock movement
exports.deleteStockMovement = async (req, res) => {
  try {
    const stock = await StockMovement.findByPk(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock movement not found' });

    await stock.destroy();
    res.json({ message: 'Stock movement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete stock movement', error: err.message });
  }
};
