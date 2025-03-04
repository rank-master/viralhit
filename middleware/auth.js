const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        throw new Error('User not found');
      }
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      // Check if this is an API request (starts with /api)
      if (req.path.startsWith('/api')) {
        return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
      }
      // For page requests (e.g., /dashboard), redirect
      return res.redirect('/auth');
    }
  }

  // No token provided
  if (!token) {
    if (req.path.startsWith('/api')) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
    return res.redirect('/auth');
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Not authorized as admin' });
  }
};
