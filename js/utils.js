/* =============================================
   UTILITIES - Helper Functions
   ============================================= */

// ============ TOAST NOTIFICATIONS ============
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast-custom ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============ FORMAT PRICE ============
function formatPrice(price) {
  return 'KSh ' + Number(price).toLocaleString('en-KE');
}

// ============ PROPERTY TYPE LABEL ============
function getPropertyTypeLabel(type) {
  const labels = {
    'single': 'Single Room',
    'bedsitter': 'Bedsitter',
    '1bedroom': '1-Bedroom',
    '2bedroom': '2-Bedroom',
    'hostel': 'Hostel'
  };
  return labels[type] || type;
}

// ============ GET STATUS BADGE ============
function getStatusBadge(status) {
  const badges = {
    'available': '<span class="status-badge status-available">Available</span>',
    'rented': '<span class="status-badge status-rented">Rented</span>',
    'pending': '<span class="status-badge status-pending">Pending</span>'
  };
  return badges[status] || status;
}

// ============ RENDER STARS ============
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ============ GET AMENITY ICON ============
function getAmenityIcon(amenity) {
  const icons = {
    'Water': 'fa-tint',
    'Electricity': 'fa-bolt',
    'WiFi': 'fa-wifi',
    'Security': 'fa-shield-alt',
    'Parking': 'fa-parking',
    'Furnished': 'fa-couch',
    'Wardrobe': 'fa-tshirt',
    'Meals': 'fa-utensils'
  };
  return icons[amenity] || 'fa-check';
}

// ============ GET CURRENT DATE ============
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// ============ TRUNCATE TEXT ============
function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// ============ VALIDATE EMAIL ============
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============ VALIDATE PHONE ============
function isValidPhone(phone) {
  return /^(\+254|0)[17]\d{8}$/.test(phone);
}

// ============ ESCAPE HTML ============
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============ LOAD COMPONENT ============
function loadComponent(elementId, html) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = html;
  }
}

// ============ GET PARAMETER FROM URL ============
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ============ FILTER LISTINGS BY DISTANCE ============
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function filterByDistance(listings, universityLat, universityLng, maxDistance) {
  return listings.filter(listing => {
    if (!listing.lat || !listing.lng) return true;
    const dist = calculateDistance(universityLat, universityLng, listing.lat, listing.lng);
    return dist <= maxDistance;
  });
}

// ============ GET DISTANCE FROM UNIVERSITY ============
function getDistanceFromUniversity(listing) {
  if (!listing.lat || !listing.lng) return null;
  const uni = getUniversity(listing.universityId);
  if (!uni) return null;
  const dist = calculateDistance(uni.lat, uni.lng, listing.lat, listing.lng);
  return Math.round(dist * 10) / 10;
}

// ============ RENDER DISTANCE BADGE ============
function renderDistanceBadge(listing) {
  const dist = getDistanceFromUniversity(listing);
  if (dist === null) return '';
  const color = dist <= 0.5 ? 'success' : dist <= 1 ? 'primary' : dist <= 2 ? 'warning' : 'secondary';
  return `<span class="distance-badge"><i class="fas fa-walking"></i> ${dist} km from campus</span>`;
}

// ============ RENDER VERIFIED BADGE ============
function renderVerifiedBadge(landlordId) {
  if (isLandlordVerified(landlordId)) {
    return `<i class="fas fa-check-circle verified-badge-sm" title="Verified Landlord"></i>`;
  }
  return '';
}

// ============ RENDER COMPARE BUTTON ============
function renderCompareButton(listingId) {
  const compareList = getComparisonList();
  const inCompare = compareList.includes(listingId);
  return `
    <button class="btn btn-sm ${inCompare ? 'btn-info' : 'btn-outline-info'}" 
            onclick="event.stopPropagation(); toggleCompare(${listingId})" 
            title="${inCompare ? 'Remove from compare' : 'Add to compare'}">
      <i class="fas fa-balance-scale"></i>
    </button>
  `;
}

// ============ TOGGLE COMPARE ============
function toggleCompare(listingId) {
  const compareList = getComparisonList();
  if (compareList.includes(listingId)) {
    removeFromComparison(listingId);
    showToast('Removed from comparison', 'info');
  } else {
    const result = addToComparison(listingId);
    if (result.success) {
      showToast('Added to comparison (' + result.list.length + '/3)', 'success');
    } else {
      showToast(result.message, 'error');
    }
  }
  // Re-render listing cards if on listings page
  if (typeof applyFilters === 'function') applyFilters();
}

// ============ RENDER NOTIFICATION BELL ============
function renderNotificationBell() {
  const user = getCurrentUser();
  if (!user) return '';
  const unread = getUnreadNotificationCount(user.id);
  return `
    <li class="nav-item dropdown">
      <a class="nav-link notification-bell" href="#" id="notifDropdown" role="button" data-bs-toggle="dropdown">
        <i class="fas fa-bell"></i>
        ${unread > 0 ? `<span class="badge bg-danger badge-count">${unread}</span>` : ''}
      </a>
      <div class="dropdown-menu dropdown-menu-end notification-dropdown" aria-labelledby="notifDropdown">
        <div class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <strong>Notifications</strong>
          ${unread > 0 ? `<button class="btn btn-sm btn-link p-0" onclick="markAllRead()">Mark all read</button>` : ''}
        </div>
        <div id="notifList">
          <div class="text-center py-3 text-muted small">Loading...</div>
        </div>
      </div>
    </li>
  `;
}

// ============ LOAD NOTIFICATIONS ============
function loadNotifications() {
  const notifList = document.getElementById('notifList');
  if (!notifList) return;
  const user = getCurrentUser();
  if (!user) return;
  const notifications = getNotificationsForUser(user.id);
  if (notifications.length === 0) {
    notifList.innerHTML = '<div class="text-center py-3 text-muted small">No notifications yet</div>';
    return;
  }
  notifList.innerHTML = notifications.slice(0, 10).map(n => `
    <div class="notification-item ${n.read ? '' : 'unread'}" onclick="openNotification(${n.id}, '${n.link || '#'}')">
      <div class="d-flex align-items-center gap-2">
        <div class="notif-icon bg-${n.color || 'primary'} text-white">
          <i class="fas ${n.icon || 'fa-bell'}" style="font-size:0.8rem;"></i>
        </div>
        <div class="flex-grow-1">
          <small class="d-block">${n.message}</small>
          <small class="text-muted">${n.date} ${n.time || ''}</small>
        </div>
        ${n.read ? '' : '<span class="badge bg-primary" style="width:8px;height:8px;border-radius:50%;padding:0;"></span>'}
      </div>
    </div>
  `).join('');
}

function markAllRead() {
  const user = getCurrentUser();
  if (!user) return;
  markAllNotificationsRead(user.id);
  loadNotifications();
  // Re-render nav to update badge count
  renderNavigation();
  showToast('All notifications marked as read', 'info');
}

function openNotification(id, link) {
  markNotificationRead(id);
  loadNotifications();
  renderNavigation();
  if (link && link !== '#') window.location.href = link;
}

// ============ RENDER NAVIGATION ============
function renderNavigation() {
  const navContainer = document.getElementById('main-navigation');
  if (!navContainer) return;
  
  const user = getCurrentUser();
  const isLoggedIn = !!user;
  
  let navLinks = '';
  
  if (isLoggedIn) {
    if (user.role === 'student') {
      navLinks = `
        <li class="nav-item"><a class="nav-link" href="listings.html"><i class="fas fa-search"></i>Browse</a></li>
        <li class="nav-item"><a class="nav-link" href="dashboard.html"><i class="fas fa-tachometer-alt"></i>Dashboard</a></li>
        <li class="nav-item"><a class="nav-link" href="listings.html?bookmarks=true"><i class="fas fa-heart"></i>Saved</a></li>
        <li class="nav-item"><a class="nav-link" href="payment.html"><i class="fas fa-credit-card"></i>Payments</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html"><i class="fas fa-headset"></i>Contact</a></li>
      `;
    } else if (user.role === 'landlord') {
      navLinks = `
        <li class="nav-item"><a class="nav-link" href="dashboard.html"><i class="fas fa-tachometer-alt"></i>Dashboard</a></li>
        <li class="nav-item"><a class="nav-link" href="post-listing.html"><i class="fas fa-plus-circle"></i>Post House</a></li>
        <li class="nav-item"><a class="nav-link" href="listings.html?my=true"><i class="fas fa-list"></i>My Listings</a></li>
        <li class="nav-item"><a class="nav-link" href="payment.html"><i class="fas fa-credit-card"></i>Payments</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html"><i class="fas fa-headset"></i>Contact</a></li>
      `;
    } else if (user.role === 'admin') {
      navLinks = `
        <li class="nav-item"><a class="nav-link" href="admin.html"><i class="fas fa-cog"></i>Admin Panel</a></li>
        <li class="nav-item"><a class="nav-link" href="listings.html"><i class="fas fa-search"></i>Browse</a></li>
        <li class="nav-item"><a class="nav-link" href="payment.html"><i class="fas fa-credit-card"></i>Payments</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html"><i class="fas fa-headset"></i>Contact</a></li>
      `;
    }
    
    navContainer.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
        <div class="container">
          <a class="navbar-brand" href="index.html"><i class="fas fa-home"></i> UniHouse</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              ${navLinks}
            </ul>
            <ul class="navbar-nav align-items-center">
              ${renderNotificationBell()}
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle user-badge" href="#" role="button" data-bs-toggle="dropdown">
                  <i class="fas fa-user"></i> ${escapeHtml(user.name || user.email)}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="profile.html"><i class="fas fa-id-card"></i> My Profile</a></li>
                  <li><a class="dropdown-item" href="dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
    
    // Load notifications after nav is rendered
    setTimeout(loadNotifications, 100);
  } else {
    navContainer.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
        <div class="container">
          <a class="navbar-brand" href="index.html"><i class="fas fa-home"></i> UniHouse</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item"><a class="nav-link" href="listings.html"><i class="fas fa-search"></i>Browse Houses</a></li>
              <li class="nav-item"><a class="nav-link" href="contact.html"><i class="fas fa-headset"></i>Contact</a></li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item"><a class="nav-link" href="auth.html"><i class="fas fa-sign-in-alt"></i>Login / Register</a></li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

// ============ HANDLE LOGOUT ============
function handleLogout() {
  logoutUser();
  showToast('Logged out successfully', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// ============ RENDER FOOTER ============
function renderFooter() {
  const footerContainer = document.getElementById('main-footer');
  if (!footerContainer) return;
  
  footerContainer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-3">
            <h5><i class="fas fa-home text-primary"></i> UniHouse Kenya</h5>
            <p>Your trusted platform for finding student accommodation near Kenyan universities. Connecting students with landlords across the country.</p>
          </div>
          <div class="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><a href="listings.html"><i class="fas fa-chevron-right"></i> Browse Houses</a></li>
              <li><a href="auth.html"><i class="fas fa-chevron-right"></i> Register as Student</a></li>
              <li><a href="auth.html"><i class="fas fa-chevron-right"></i> Register as Landlord</a></li>
              <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a></li>
            </ul>
          </div>
          <div class="col-md-4 mb-3">
            <h5>Supported Universities</h5>
            <ul class="list-unstyled">
              <li><i class="fas fa-university"></i> Chuka University</li>
              <li><i class="fas fa-university"></i> Tharakanithi University</li>
              <li><i class="fas fa-university"></i> University of Embu</li>
              <li><i class="fas fa-university"></i> Meru University</li>
              <li><i class="fas fa-university"></i> Dedan Kimathi University</li>
              <li><i class="fas fa-university"></i> Karatina University</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 UniHouse Kenya. All rights reserved. | University House Hunting System</p>
        </div>
      </div>
    </footer>
  `;
}