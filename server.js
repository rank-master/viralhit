const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { protect } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Protect dashboard route
app.get('/dashboard', protect, (req, res) => {
  res.sendFile(path.join(__dirname, './views/dashboard.html'));
});

// Fallback for unmatched routes
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, './public/404.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
