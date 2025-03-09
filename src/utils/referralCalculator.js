/**
 * Calculate commissions for a sale based on the referral structure
 * @param {boolean} isFirstTimeSale - Whether this is the first time the seller is making a sale
 * @param {number} amount - Sale amount
 * @param {Object} seller - Seller user object
 * @param {Object} referrer - Level 1 referrer (if exists)
 * @param {Object} superReferrer - Level 2 referrer (if exists)
 * @returns {Object} - Calculated commissions
 */
const calculateCommissions = (isFirstTimeSale, amount, seller, referrer, superReferrer) => {
    const commissions = {
      sellerCommission: 0,
      referrerCommission: 0,
      superReferrerCommission: 0,
      companyCommission: 0
    };
  
    if (isFirstTimeSale) {
      // First time sales
      if (!referrer && !superReferrer) {
        // Alice sells to Bob (first sale in chain)
        commissions.sellerCommission = amount * 0.8; // 80%
        commissions.companyCommission = amount * 0.2; // 20%
      } else if (referrer && !superReferrer) {
        // Bob sells to Charlie
        commissions.sellerCommission = amount * 0.8; // 80%
        commissions.referrerCommission = amount * 0.1; // 10% to Alice
        commissions.companyCommission = amount * 0.1; // 10% to company
      } else if (referrer && superReferrer) {
        // Charlie sells to Dave
        commissions.sellerCommission = amount * 0.8; // 80%
        commissions.referrerCommission = amount * 0.1; // 10% to Bob
        commissions.superReferrerCommission = amount * 0.05; // 5% to Alice
        commissions.companyCommission = amount * 0.05; // 5% to company
      }
    } else {
      // Second time onwards sales
      if (!referrer && !superReferrer) {
        // Alice sells again
        commissions.sellerCommission = amount * 0.6; // 60%
        commissions.companyCommission = amount * 0.4; // 40%
      } else if (referrer && !superReferrer) {
        // Bob sells again
        commissions.sellerCommission = amount * 0.6; // 60%
        commissions.referrerCommission = amount * 0.2; // 20% to Alice
        commissions.companyCommission = amount * 0.2; // 20% to company
      } else if (referrer && superReferrer) {
        // Charlie sells again
        commissions.sellerCommission = amount * 0.6; // 60%
        commissions.referrerCommission = amount * 0.2; // 20% to Bob
        commissions.superReferrerCommission = amount * 0.1; // 10% to Alice
        commissions.companyCommission = amount * 0.1; // 10% to company
      }
    }
  
    return commissions;
  };
  
  module.exports = { calculateCommissions };