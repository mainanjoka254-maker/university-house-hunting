/* =============================================
   PAYMENT SYSTEM - M-Pesa Style Simulation
   ============================================= */

// ============ PAYMENT CONSTANTS ============
const PAYMENT_AMOUNT = 250; // KSh
const PAYMENT_PURPOSE = {
  CONTACT_LANDLORD: 'contact',
  UNLOCK_LISTING: 'unlock',
  PREMIUM_ACCESS: 'premium'
};

// ============ PAYMENT CRUD ============
function getPayments() {
  return JSON.parse(localStorage.getItem('uhs_payments')) || [];
}

function savePayments(payments) {
  localStorage.setItem('uhs_payments', JSON.stringify(payments));
}

// Generate unique transaction code (simulating M-Pesa)
function generateTransactionCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'UHS';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Initiate a payment
function initiatePayment(userId, listingId, purpose = PAYMENT_PURPOSE.CONTACT_LANDLORD) {
  const payment = {
    id: generateId(),
    userId: userId,
    listingId: listingId,
    amount: PAYMENT_AMOUNT,
    purpose: purpose,
    transactionCode: generateTransactionCode(),
    status: 'pending', // pending, completed, failed, refunded
    paymentMethod: 'M-Pesa',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' }),
    completedAt: null
  };

  const payments = getPayments();
  payments.push(payment);
  savePayments(payments);
  
  return { success: true, payment };
}

// Complete payment (simulate M-Pesa confirmation)
function completePayment(paymentId, phone) {
  const payments = getPayments();
  const payment = payments.find(p => p.id === paymentId);
  
  if (!payment) {
    return { success: false, message: 'Payment not found' };
  }

  payment.status = 'completed';
  payment.phone = phone || 'N/A';
  payment.completedAt = new Date().toISOString();
  
  // Update session to track paid listings
  trackPaidListing(payment.userId, payment.listingId);
  
  savePayments(payments);
  return { success: true, payment };
}

// Fail a payment
function failPayment(paymentId) {
  const payments = getPayments();
  const payment = payments.find(p => p.id === paymentId);
  
  if (!payment) {
    return { success: false, message: 'Payment not found' };
  }

  payment.status = 'failed';
  savePayments(payments);
  return { success: true, payment };
}

// Refund a payment
function refundPayment(paymentId) {
  const payments = getPayments();
  const payment = payments.find(p => p.id === paymentId);
  
  if (!payment) {
    return { success: false, message: 'Payment not found' };
  }

  payment.status = 'refunded';
  savePayments(payments);
  return { success: true, payment };
}

// ============ PAID LISTINGS TRACKING ============
function trackPaidListing(userId, listingId) {
  let tracked = JSON.parse(localStorage.getItem('uhs_paid_listings')) || [];
  
  // Check if already tracked
  const exists = tracked.find(t => t.userId === userId && t.listingId === listingId);
  if (!exists) {
    tracked.push({
      userId,
      listingId,
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('uhs_paid_listings', JSON.stringify(tracked));
  }
}

function hasPaidForListing(userId, listingId) {
  if (!userId) return false;
  
  // Admin always has access
  const user = getCurrentUser();
  if (user && user.role === 'admin') return true;
  
  const tracked = JSON.parse(localStorage.getItem('uhs_paid_listings')) || [];
  return tracked.some(t => t.userId === userId && t.listingId === listingId);
}

function getUserPaidListings(userId) {
  const tracked = JSON.parse(localStorage.getItem('uhs_paid_listings')) || [];
  return tracked.filter(t => t.userId === userId);
}

// ============ PAYMENT QUERIES ============
function getPaymentByTransaction(transactionCode) {
  return getPayments().find(p => p.transactionCode === transactionCode);
}

function getPaymentsForUser(userId) {
  return getPayments().filter(p => p.userId === userId).sort((a, b) => 
    new Date(b.date + ' ' + (b.time || '00:00')) - new Date(a.date + ' ' + (a.time || '00:00'))
  );
}

function getPaymentsForListing(listingId) {
  return getPayments().filter(p => p.listingId === listingId);
}

function getPaymentsForLandlord(landlordId) {
  const listings = getListingsByLandlord(landlordId);
  const listingIds = listings.map(l => l.id);
  const allPayments = getPayments();
  return allPayments.filter(p => listingIds.includes(p.listingId))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getPaymentStats() {
  const payments = getPayments();
  const completed = payments.filter(p => p.status === 'completed');
  const totalRevenue = completed.reduce((sum, p) => sum + p.amount, 0);
  
  return {
    total: payments.length,
    completed: completed.length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    refunded: payments.filter(p => p.status === 'refunded').length,
    totalRevenue: totalRevenue,
    uniquePayers: new Set(completed.map(p => p.userId)).size
  };
}

// ============ CHECK ACCESS ============
function checkListingAccess(userId, listingId) {
  if (!userId) return { allowed: false, reason: 'login' };
  
  const user = getCurrentUser();
  if (!user) return { allowed: false, reason: 'login' };
  
  // Landlords can access their own listings
  const listing = getListing(listingId);
  if (!listing) return { allowed: false, reason: 'not_found' };
  
  if (listing.landlordId === userId) return { allowed: true };
  if (user.role === 'admin') return { allowed: true };
  
  // Student: check if paid
  if (hasPaidForListing(userId, listingId)) {
    return { allowed: true };
  }
  
  return { 
    allowed: false, 
    reason: 'payment',
    amount: PAYMENT_AMOUNT,
    listingId: listingId 
  };
}

// ============ PAYMENT INITIATION FLOW ============
function initiateAndCompletePayment(userId, listingId, phone, purpose = PAYMENT_PURPOSE.CONTACT_LANDLORD) {
  // Check if already paid
  if (hasPaidForListing(userId, listingId)) {
    return { success: true, alreadyPaid: true };
  }
  
  // Initiate payment
  const initResult = initiatePayment(userId, listingId, purpose);
  if (!initResult.success) {
    return { success: false, message: 'Failed to initiate payment' };
  }
  
  // Complete payment (simulate M-Pesa confirmation)
  const completeResult = completePayment(initResult.payment.id, phone);
  if (!completeResult.success) {
    failPayment(initResult.payment.id);
    return { success: false, message: 'Payment failed' };
  }
  
  return { 
    success: true, 
    alreadyPaid: false,
    payment: completeResult.payment,
    transactionCode: completeResult.payment.transactionCode
  };
}