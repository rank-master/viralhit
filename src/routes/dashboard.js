const express = require('express');
const { getDashboardStats } = require('../controllers/salesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats - GET /api/dashboard
router.get('/', protect, getDashboardStats);

module.exports = router;