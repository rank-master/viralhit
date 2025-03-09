const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new user
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, referralCode } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check referral code if provided
    let referredBy = null;
    let level1Referrer = null;
    let level2Referrer = null;

    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (!referrer) {
        return res.status(400).json({ message: 'Invalid referral code' });
      }

      referredBy = referrer._id;
      level1Referrer = referrer._id;
      
      // If the referrer has a referrer, set as level 2 referrer
      if (referrer.referredBy) {
        level2Referrer = referrer.referredBy;
      }
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      referredBy,
      level1Referrer,
      level2Referrer
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production'
    });

    // Return user data
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production'
    });

    // Return user data
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      salesCount: user.salesCount,
      earnings: user.earnings,
      passiveEarnings: user.passiveEarnings,
      superPassiveEarnings: user.superPassiveEarnings
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout user
const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  getUserProfile,
  logout
};