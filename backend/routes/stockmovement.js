const express = require('express');
const router = express.Router();
const stockMovementController = require('../controllers/stockmovementController');


router.post('/', stockMovementController.createStockMovement);
router.get('/', stockMovementController.getAllStockMovements);
router.get('/:id', stockMovementController.getStockMovementById);
router.put('/:id', stockMovementController.updateStockMovement);
router.delete('/:id', stockMovementController.deleteStockMovement);

module.exports = router;