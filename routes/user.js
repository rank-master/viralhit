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

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      referralLink: user.referralLink,
      balance: user.balance || 0,
      totalEarnings: user.totalEarnings || user.balance || 0,
      totalReferrals: user.totalReferrals || 0,
      monthEarnings: user.monthEarnings || 0,
      networkSize: user.networkSize || 0,
      directCommissions: user.directCommissions || 0,
      indirectCommissions: user.indirectCommissions || 0,
      superPassive: user.superPassive || 0,
      directReferrals: user.directReferrals || 0,
      indirectReferrals: user.indirectReferrals || 0,
      conversionRate: user.conversionRate || 0,
      directReferralsList: user.directReferralsList || [],
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