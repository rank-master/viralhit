const User = require('../models/User');
const Sale = require('../models/Sale');
const { calculateCommissions } = require('../utils/referralCalculator');

// Register a new sale
const registerSale = async (req, res) => {
  try {
    const { buyerEmail } = req.body;
    const sellerId = req.user._id;
    
    // Find buyer by email
    const buyer = await User.findOne({ email: buyerEmail });
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    // Check if seller is trying to sell to themselves
    if (buyer._id.toString() === sellerId.toString()) {
      return res.status(400).json({ message: 'Cannot sell to yourself' });
    }

    // Get seller information
    const seller = await User.findById(sellerId);
    
    // Check if this buyer has already purchased from this seller
    const existingSale = await Sale.findOne({
      seller: sellerId,
      buyer: buyer._id
    });

    const isFirstTimeSale = !existingSale;
    
    // Get referrers
    let referrer = null;
    let superReferrer = null;
    
    if (seller.level1Referrer) {
      referrer = await User.findById(seller.level1Referrer);
    }
    
    if (seller.level2Referrer) {
      superReferrer = await User.findById(seller.level2Referrer);
    }
    
    // Calculate commissions
    const amount = 100; // ₹100 as per your business model
    const commissions = calculateCommissions(
      isFirstTimeSale,
      amount,
      seller,
      referrer,
      superReferrer
    );
    
    // Create sale record
    const sale = new Sale({
      seller: sellerId,
      buyer: buyer._id,
      amount,
      sellerCommission: commissions.sellerCommission,
      referrerCommission: commissions.referrerCommission,
      superReferrerCommission: commissions.superReferrerCommission,
      companyCommission: commissions.companyCommission,
      isFirstTimeSale
    });
    
    await sale.save();
    
    // Update seller's stats
    seller.salesCount += 1;
    seller.earnings += commissions.sellerCommission;
    await seller.save();
    
    // Update referrer's stats if exists
    if (referrer) {
      referrer.passiveEarnings += commissions.referrerCommission;
      await referrer.save();
    }
    
    // Update super referrer's stats if exists
    if (superReferrer) {
      superReferrer.superPassiveEarnings += commissions.superReferrerCommission;
      await superReferrer.save();
    }
    
    // Update buyer's referral chain
    if (!buyer.referredBy) {
      buyer.referredBy = sellerId;
      buyer.level1Referrer = sellerId;
      
      if (seller.referredBy) {
        buyer.level2Referrer = seller.referredBy;
      }
      
      await buyer.save();
    }
    
    res.status(201).json({
      message: 'Sale registered successfully',
      sale: {
        seller: seller.email,
        buyer: buyer.email,
        amount,
        sellerCommission: commissions.sellerCommission,
        referrerCommission: commissions.referrerCommission,
        superReferrerCommission: commissions.superReferrerCommission,
        companyCommission: commissions.companyCommission,
        isFirstTimeSale
      }
    });
  } catch (error) {
    console.error('Register sale error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all sales for the logged-in user
const getUserSales = async (req, res) => {
  try {
    const sales = await Sale.find({ seller: req.user._id })
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(sales);
  } catch (error) {
    console.error('Get user sales error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all passive income sales for the logged-in user
const getPassiveIncome = async (req, res) => {
  try {
    const passiveSales = await Sale.find({
      $or: [
        { $and: [{ referrerCommission: { $gt: 0 } }, { seller: req.user._id }] },
        { $and: [{ superReferrerCommission: { $gt: 0 } }, { seller: req.user._id }] }
      ]
    }).populate('buyer seller', 'name email').sort({ createdAt: -1 });
    
    res.json(passiveSales);
  } catch (error) {
    console.error('Get passive income error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user details
    const user = await User.findById(userId).select('-password');
    
    // Get direct sales
    const directSales = await Sale.find({ seller: userId }).countDocuments();
    
    // Get referrals (users who used this user's referral code)
    const referrals = await User.find({ referredBy: userId }).countDocuments();
    
    // Calculate total earnings
    const totalEarnings = user.earnings + user.passiveEarnings + user.superPassiveEarnings;
    
    // Get recent sales
    const recentSales = await Sale.find({ seller: userId })
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get recent passive income
    const recentPassiveIncome = await Sale.find({
      $or: [
        { $and: [{ referrerCommission: { $gt: 0 } }, { seller: userId }] },
        { $and: [{ superReferrerCommission: { $gt: 0 } }, { seller: userId }] }
      ]
    })
      .populate('buyer seller', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode
      },
      stats: {
        salesCount: user.salesCount,
        directSales,
        referrals,
        earnings: user.earnings,
        passiveEarnings: user.passiveEarnings,
        superPassiveEarnings: user.superPassiveEarnings,
        totalEarnings
      },
      recentActivity: {
        recentSales,
        recentPassiveIncome
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerSale,
  getUserSales,
  getPassiveIncome,
  getDashboardStats
};