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

// Explicit root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Protect dashboard route
app.get('/dashboard', protect, (req, res) => {
  res.sendFile(path.join(__dirname, './views/dashboard.html'));
});

// Server-side redirect map
const redirectMap = {
  '/bronze-package': '/bronze-package.html',
  '/gold-package': '/gold-package.html',
  '/diamond-package': '/diamond-package.html',
  '/auth': '/auth.html'
};

app.get('*', (req, res) => {
  const redirectPath = redirectMap[req.path];
  if (redirectPath) {
    res.redirect(301, redirectPath); // Server-side redirect
  } else {
    res.status(404).sendFile(path.join(__dirname, './public/404.html'));
  }
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
