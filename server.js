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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// Explicit root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Serve static pages
app.get('/bronze-package', (req, res) => {
  res.sendFile(path.join(__dirname, './public/bronze-package.html'));
});

app.get('/gold-package', (req, res) => {
  res.sendFile(path.join(__dirname, './public/gold-package.html'));
});

app.get('/diamond-package', (req, res) => {
  res.sendFile(path.join(__dirname, './public/diamond-package.html'));
});

// Serve auth.html for /auth route
app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, './public/auth.html'));
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Protect dashboard route
app.get('/dashboard', protect, (req, res) => {
  res.sendFile(path.join(__dirname, './views/dashboard.html'));
});

// Wildcard route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
