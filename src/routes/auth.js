const express = require('express');
const { check } = require('express-validator');
const { register, login, getUserProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register route - POST /api/auth/register
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
);

// Login route - POST /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

// Get user profile - GET /api/auth/profile
router.get('/profile', protect, getUserProfile);

// Logout route - POST /api/auth/logout
router.post('/logout', logout);

module.exports = router;