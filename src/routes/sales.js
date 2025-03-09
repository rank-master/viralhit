const express = require('express');
const { registerSale, getUserSales, getPassiveIncome } = require('../controllers/salesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register a new sale - POST /api/sales
router.post('/', protect, registerSale);

// Get user's sales - GET /api/sales
router.get('/', protect, getUserSales);

// Get passive income - GET /api/sales/passive
router.get('/passive', protect, getPassiveIncome);

module.exports = router;