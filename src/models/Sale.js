const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 100
  },
  sellerCommission: {
    type: Number,
    required: true
  },
  referrerCommission: {
    type: Number,
    default: 0
  },
  superReferrerCommission: {
    type: Number,
    default: 0
  },
  companyCommission: {
    type: Number,
    required: true
  },
  isFirstTimeSale: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', SaleSchema);