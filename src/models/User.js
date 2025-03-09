const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  referralCode: {
    type: String,
    unique: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  level1Referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  level2Referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  salesCount: {
    type: Number,
    default: 0
  },
  earnings: {
    type: Number,
    default: 0
  },
  passiveEarnings: {
    type: Number,
    default: 0
  },
  superPassiveEarnings: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate referral code before saving
UserSchema.pre('save', async function(next) {
  if (!this.referralCode) {
    // Generate a random referral code
    this.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Hash password before saving
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  next();
});

// Method to compare password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);