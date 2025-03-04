const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
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
  balance: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0 // Total earnings from all sources
  },
  totalReferrals: {
    type: Number,
    default: 0 // Total direct + indirect referrals
  },
  monthEarnings: {
    type: Number,
    default: 0 // Earnings for the current month
  },
  networkSize: {
    type: Number,
    default: 0 // Total users in referral network (direct + indirect)
  },
  directCommissions: {
    type: Number,
    default: 0 // Earnings from direct referrals
  },
  indirectCommissions: {
    type: Number,
    default: 0 // Earnings from indirect referrals
  },
  superPassive: {
    type: Number,
    default: 0 // Earnings from deeper network levels
  },
  directReferrals: {
    type: Number,
    default: 0 // Count of direct referrals
  },
  indirectReferrals: {
    type: Number,
    default: 0 // Count of indirect referrals
  },
  conversionRate: {
    type: Number,
    default: 0 // Percentage of link clicks converting to signups/purchases
  },
  directReferralsList: [{
    name: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    package: { type: String, default: 'N/A' }, // e.g., "Bronze", "Gold"
    theirReferrals: { type: Number, default: 0 }, // Count of their referrals
    earningsGenerated: { type: Number, default: 0 }, // Total earnings from this referral
    subReferrals: [{
      name: { type: String, required: true },
      joined: { type: Date, default: Date.now },
      package: { type: String, default: 'N/A' },
      earningsForYou: { type: Number, default: 0 } // Earnings you get from this sub-referral
    }]
  }],
  referralLink: {
    type: String,
    default: function() {
      return `https://9ties.com/ref/${this.referralCode}`;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate referral code and link before saving
UserSchema.pre('save', async function(next) {
  // Hash password if modified
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Generate unique referral code if not already present
  if (!this.referralCode) {
    this.referralCode = crypto.randomBytes(4).toString('hex');
  }

  // Ensure referralLink is set
  if (!this.referralLink) {
    this.referralLink = `https://9ties.com/ref/${this.referralCode}`;
  }

  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);