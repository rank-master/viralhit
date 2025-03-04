const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const Course = require('../models/Course');
const router = express.Router();

router.get('/dashboard', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const courses = await Course.find();

    // Example: Add more user data - adjust based on your User model
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      referralLink: user.referralLink,
      balance: user.balance || 0, // Available balance
      totalEarnings: user.totalEarnings || user.balance || 0, // Total earned over time
      totalReferrals: user.totalReferrals || 0, // Total direct + indirect
      monthEarnings: user.monthEarnings || 0, // Earnings this month
      networkSize: user.networkSize || 0, // Total downstream users
      directCommissions: user.directCommissions || 0,
      indirectCommissions: user.indirectCommissions || 0,
      superPassive: user.superPassive || 0,
      directReferrals: user.directReferrals || 0, // Direct referral count
      indirectReferrals: user.indirectReferrals || 0, // Indirect referral count
      conversionRate: user.conversionRate || 0, // Percentage
      directReferralsList: user.directReferralsList || [], // Array of referral details
      courses: courses.map(course => ({
        name: course.name,
        price: course.price,
        image: course.image
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;