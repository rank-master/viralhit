const express = require('express');
const User = require('../models/User'); // Import the User model
const Course = require('../models/Course'); // Import the Course model
const router = express.Router();

// Dashboard API endpoint
router.get('/api/user/dashboard', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated
    const user = await User.findById(userId); // Fetch user data
    const courses = await Course.find(); // Fetch all available courses

    res.json({
      referralLink: user.referralLink,
      balance: user.balance,
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
