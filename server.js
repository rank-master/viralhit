const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

// Route imports
const authRoutes = require('./routes/auth');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, './public')));

// API Routes
app.use('/api/auth', authRoutes);

// Define a redirect map for specific routes
const redirectMap = {
  '/auth': '/auth.html',
  '/bronze-package': '/bronze-package.html',
  '/gold-package': '/gold-package.html',
  '/diamond-package': '/diamond-package.html'
};

// Fallback Route for Unmatched Paths
app.get('*', (req, res) => {
  if (redirectMap[req.path]) {
    // Redirect to the corresponding .html file
    res.redirect(301, redirectMap[req.path]); // 301 = Permanent Redirect
  } else {
    // Serve the custom 404 page
    res.status(404).sendFile(path.join(__dirname, './public', '404.html'));
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
