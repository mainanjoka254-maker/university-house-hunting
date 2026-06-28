/* =============================================
   DATA LAYER - LocalStorage CRUD Operations
   ============================================= */

const DB = {
  // ============ UNIVERSITIES ============
  universities: [
    {
      id: 1,
      name: "Chuka University",
      town: "Chuka",
      county: "Tharaka Nithi",
      lat: -0.3333,
      lng: 37.65,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "Tharakanithi University",
      town: "Kathwana",
      county: "Tharaka Nithi",
      lat: -0.35,
      lng: 37.75,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "University of Embu",
      town: "Embu",
      county: "Embu",
      lat: -0.5333,
      lng: 37.45,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      name: "Meru University of Science & Technology",
      town: "Meru",
      county: "Meru",
      lat: 0.05,
      lng: 37.65,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      name: "Dedan Kimathi University of Technology",
      town: "Nyeri",
      county: "Nyeri",
      lat: -0.45,
      lng: 36.95,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      name: "Karatina University",
      town: "Karatina",
      county: "Nyeri",
      lat: -0.4833,
      lng: 37.1167,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 7,
      name: "Nyeri National Polytechnic",
      town: "Nyeri",
      county: "Nyeri",
      lat: -0.4167,
      lng: 36.95,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 8,
      name: "Mount Kenya University (Main Campus)",
      town: "Thika",
      county: "Kiambu",
      lat: -1.0333,
      lng: 37.0833,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 9,
      name: "Kenya Methodist University",
      town: "Meru",
      county: "Meru",
      lat: 0.0667,
      lng: 37.65,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      id: 10,
      name: "Embu College (TECH)",
      town: "Embu",
      county: "Embu",
      lat: -0.5,
      lng: 37.5,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    }
  ],

  // ============ SAMPLE LISTINGS ============
  sampleListings: [
    {
      id: 1,
      title: "Modern Bedsitter near Chuka University",
      description: "Clean and spacious bedsitter located just 5 minutes walk from Chuka University main gate. Ideal for students. Water and electricity included.",
      price: 3500,
      propertyType: "bedsitter",
      universityId: 1,
      location: "Chuka Town, near University",
      lat: -0.33,
      lng: 37.65,
      amenities: ["Water", "Electricity", "Security", "Wardrobe"],
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"],
      landlordId: 2,
      status: "available",
      createdAt: "2026-01-15",
      views: 45
    },
    {
      id: 2,
      title: "Spacious 1-Bedroom Apartment - Meru Uni",
      description: "Fully furnished 1-bedroom apartment with a sitting room, kitchen and bathroom. Located in a quiet estate near Meru University.",
      price: 6000,
      propertyType: "1bedroom",
      universityId: 4,
      location: "Meru, Nkubu",
      lat: 0.05,
      lng: 37.66,
      amenities: ["Water", "Electricity", "WiFi", "Parking", "Furnished", "Security"],
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"],
      landlordId: 2,
      status: "available",
      createdAt: "2026-02-01",
      views: 32
    },
    {
      id: 3,
      title: "Single Room near Dedan Kimathi",
      description: "Affordable single room near Dedan Kimathi University. Walking distance to campus. Shared kitchen and bathroom.",
      price: 2000,
      propertyType: "single",
      universityId: 5,
      location: "Nyeri Town",
      lat: -0.44,
      lng: 36.94,
      amenities: ["Water", "Electricity"],
      images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop"],
      landlordId: 3,
      status: "available",
      createdAt: "2026-01-20",
      views: 28
    },
    {
      id: 4,
      title: "Student Hostel - University of Embu",
      description: "Well-maintained student hostel with single and double rooms. Meals included. 24/7 security and WiFi available.",
      price: 4500,
      propertyType: "hostel",
      universityId: 3,
      location: "Embu, near University",
      lat: -0.53,
      lng: 37.46,
      amenities: ["Water", "Electricity", "WiFi", "Security", "Meals", "Furnished"],
      images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"],
      landlordId: 3,
      status: "available",
      createdAt: "2026-02-10",
      views: 55
    },
    {
      id: 5,
      title: "2-Bedroom House near Karatina University",
      description: "A cozy 2-bedroom house perfect for shared student accommodation. Near Karatina University town campus.",
      price: 8000,
      propertyType: "2bedroom",
      universityId: 6,
      location: "Karatina Town",
      lat: -0.48,
      lng: 37.12,
      amenities: ["Water", "Electricity", "Parking", "Security", "Wardrobe"],
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop"],
      landlordId: 4,
      status: "available",
      createdAt: "2026-01-25",
      views: 20
    },
    {
      id: 6,
      title: "Bedsitter near Tharakanithi University",
      description: "Newly built bedsitter with modern finishes. Located in Kathwana town, a short distance from Tharakanithi University.",
      price: 3000,
      propertyType: "bedsitter",
      universityId: 2,
      location: "Kathwana Town",
      lat: -0.35,
      lng: 37.76,
      amenities: ["Water", "Electricity", "Security", "Wardrobe", "Parking"],
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"],
      landlordId: 4,
      status: "available",
      createdAt: "2026-02-15",
      views: 15
    },
    {
      id: 7,
      title: "Studio Apartment - MKU Thika",
      description: "Modern studio apartment near Mount Kenya University Thika campus. Self-contained with kitchen area.",
      price: 5500,
      propertyType: "bedsitter",
      universityId: 8,
      location: "Thika, MKU area",
      lat: -1.03,
      lng: 37.08,
      amenities: ["Water", "Electricity", "WiFi", "Security", "Furnished"],
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"],
      landlordId: 5,
      status: "available",
      createdAt: "2026-02-20",
      views: 40
    },
    {
      id: 8,
      title: "Single Room near Nyeri Polytechnic",
      description: "Affordable single room near Nyeri National Polytechnic. Quiet environment good for studies.",
      price: 1800,
      propertyType: "single",
      universityId: 7,
      location: "Nyeri, Polytechnic area",
      lat: -0.41,
      lng: 36.94,
      amenities: ["Water", "Electricity"],
      images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop"],
      landlordId: 5,
      status: "available",
      createdAt: "2026-01-10",
      views: 22
    },
    {
      id: 9,
      title: "1-Bedroom near KeMU Meru",
      description: "Spacious 1-bedroom with separate sitting room. Near Kenya Methodist University. Water and electricity included.",
      price: 5000,
      propertyType: "1bedroom",
      universityId: 9,
      location: "Meru, KeMU area",
      lat: 0.07,
      lng: 37.65,
      amenities: ["Water", "Electricity", "Security", "Wardrobe", "Parking"],
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"],
      landlordId: 6,
      status: "available",
      createdAt: "2026-02-05",
      views: 18
    },
    {
      id: 10,
      title: "Student Bedsitter - Chuka University",
      description: "Well-furnished bedsitter with a balcony. Close to Chuka University. Ideal for a single student.",
      price: 4000,
      propertyType: "bedsitter",
      universityId: 1,
      location: "Chuka, Magutuni",
      lat: -0.34,
      lng: 37.66,
      amenities: ["Water", "Electricity", "WiFi", "Security", "Furnished", "Wardrobe"],
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"],
      landlordId: 6,
      status: "available",
      createdAt: "2026-03-01",
      views: 35
    }
  ],

  // ============ SAMPLE REVIEWS ============
  sampleReviews: [
    { id: 1, listingId: 1, userId: 1, userName: "John M.", rating: 4, comment: "Good place, close to campus. Landlord is friendly.", date: "2026-02-10" },
    { id: 2, listingId: 1, userId: 4, userName: "Sarah K.", rating: 5, comment: "Very clean and affordable. Highly recommend!", date: "2026-02-15" },
    { id: 3, listingId: 2, userId: 1, userName: "Peter N.", rating: 4, comment: "Spacious apartment, good for a couple.", date: "2026-03-01" },
    { id: 4, listingId: 4, userId: 5, userName: "Grace W.", rating: 5, comment: "Best hostel near Embu Uni. Meals are good!", date: "2026-02-20" },
    { id: 5, listingId: 7, userId: 6, userName: "David O.", rating: 3, comment: "Decent place but a bit pricey for the size.", date: "2026-03-05" }
  ]
};

// ============ INITIALIZE DATABASE ============
function initDB() {
  if (!localStorage.getItem('uhs_initialized')) {
    localStorage.setItem('uhs_universities', JSON.stringify(DB.universities));
    localStorage.setItem('uhs_listings', JSON.stringify(DB.sampleListings));
    localStorage.setItem('uhs_reviews', JSON.stringify(DB.sampleReviews));
    localStorage.setItem('uhs_users', JSON.stringify([]));
    localStorage.setItem('uhs_messages', JSON.stringify([]));
    localStorage.setItem('uhs_bookmarks', JSON.stringify([]));
    localStorage.setItem('uhs_initialized', 'true');
    console.log('Database initialized with sample data');
  }
}

// ============ GENERATE ID ============
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// ============ UNIVERSITIES ============
function getUniversities() {
  return JSON.parse(localStorage.getItem('uhs_universities')) || [];
}

function getUniversity(id) {
  return getUniversities().find(u => u.id === id);
}

// ============ USERS ============
function getUsers() {
  return JSON.parse(localStorage.getItem('uhs_users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('uhs_users', JSON.stringify(users));
}

function registerUser(user) {
  const users = getUsers();
  // Check if email already exists
  if (users.find(u => u.email === user.email)) {
    return { success: false, message: 'Email already registered' };
  }
  user.id = generateId();
  user.createdAt = new Date().toISOString().split('T')[0];
  users.push(user);
  saveUsers(users);
  return { success: true, user };
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user };
  }
  return { success: false, message: 'Invalid email or password' };
}

function getCurrentUser() {
  const userData = localStorage.getItem('uhs_currentUser');
  return userData ? JSON.parse(userData) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('uhs_currentUser', JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem('uhs_currentUser');
}

function updateUser(updatedUser) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
    setCurrentUser(updatedUser);
    return { success: true };
  }
  return { success: false, message: 'User not found' };
}

// ============ LISTINGS ============
function getListings() {
  return JSON.parse(localStorage.getItem('uhs_listings')) || [];
}

function saveListings(listings) {
  localStorage.setItem('uhs_listings', JSON.stringify(listings));
}

function getListing(id) {
  return getListings().find(l => l.id === id);
}

function addListing(listing) {
  const listings = getListings();
  listing.id = generateId();
  listing.createdAt = new Date().toISOString().split('T')[0];
  listing.views = 0;
  listing.status = 'available';
  listings.push(listing);
  saveListings(listings);
  return { success: true, listing };
}

function updateListing(updatedListing) {
  const listings = getListings();
  const index = listings.findIndex(l => l.id === updatedListing.id);
  if (index !== -1) {
    listings[index] = updatedListing;
    saveListings(listings);
    return { success: true };
  }
  return { success: false, message: 'Listing not found' };
}

function deleteListing(id) {
  let listings = getListings();
  listings = listings.filter(l => l.id !== id);
  saveListings(listings);
  return { success: true };
}

function getListingsByUniversity(universityId) {
  return getListings().filter(l => l.universityId === universityId);
}

function getListingsByLandlord(landlordId) {
  return getListings().filter(l => l.landlordId === landlordId);
}

function incrementViews(listingId) {
  const listings = getListings();
  const listing = listings.find(l => l.id === listingId);
  if (listing) {
    listing.views = (listing.views || 0) + 1;
    saveListings(listings);
  }
}

// ============ REVIEWS ============
function getReviews() {
  return JSON.parse(localStorage.getItem('uhs_reviews')) || [];
}

function saveReviews(reviews) {
  localStorage.setItem('uhs_reviews', JSON.stringify(reviews));
}

function getReviewsForListing(listingId) {
  return getReviews().filter(r => r.listingId === listingId);
}

function addReview(review) {
  const reviews = getReviews();
  review.id = generateId();
  review.date = new Date().toISOString().split('T')[0];
  reviews.push(review);
  saveReviews(reviews);
  return { success: true, review };
}

function getAverageRating(listingId) {
  const reviews = getReviewsForListing(listingId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

// ============ MESSAGES ============
function getMessages() {
  return JSON.parse(localStorage.getItem('uhs_messages')) || [];
}

function saveMessages(messages) {
  localStorage.setItem('uhs_messages', JSON.stringify(messages));
}

function sendMessage(message) {
  const messages = getMessages();
  message.id = generateId();
  message.date = new Date().toISOString().split('T')[0];
  message.read = false;
  messages.push(message);
  saveMessages(messages);
  return { success: true, message };
}

function getMessagesForUser(userId) {
  return getMessages().filter(m => m.toUserId === userId || m.fromUserId === userId);
}

function getMessagesForLandlord(landlordId) {
  return getMessages().filter(m => m.toUserId === landlordId);
}

function markMessageRead(messageId) {
  const messages = getMessages();
  const msg = messages.find(m => m.id === messageId);
  if (msg) {
    msg.read = true;
    saveMessages(messages);
  }
}

// ============ BOOKMARKS ============
function getBookmarks() {
  return JSON.parse(localStorage.getItem('uhs_bookmarks')) || [];
}

function saveBookmarks(bookmarks) {
  localStorage.setItem('uhs_bookmarks', JSON.stringify(bookmarks));
}

function toggleBookmark(userId, listingId) {
  let bookmarks = getBookmarks();
  const existing = bookmarks.find(b => b.userId === userId && b.listingId === listingId);
  if (existing) {
    bookmarks = bookmarks.filter(b => !(b.userId === userId && b.listingId === listingId));
    saveBookmarks(bookmarks);
    return { success: true, bookmarked: false };
  } else {
    bookmarks.push({ userId, listingId, date: new Date().toISOString().split('T')[0] });
    saveBookmarks(bookmarks);
    return { success: true, bookmarked: true };
  }
}

function isBookmarked(userId, listingId) {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.userId === userId && b.listingId === listingId);
}

function getUserBookmarks(userId) {
  const bookmarks = getBookmarks().filter(b => b.userId === userId);
  const listings = getListings();
  return bookmarks.map(b => listings.find(l => l.id === b.listingId)).filter(l => l);
}

// ============ SEARCH & FILTER ============
function searchListings(filters) {
  let listings = getListings();
  
  if (filters.universityId) {
    listings = listings.filter(l => l.universityId === parseInt(filters.universityId));
  }
  
  if (filters.search) {
    const q = filters.search.toLowerCase();
    listings = listings.filter(l => 
      l.title.toLowerCase().includes(q) || 
      l.description.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q)
    );
  }
  
  if (filters.propertyType) {
    listings = listings.filter(l => l.propertyType === filters.propertyType);
  }
  
  if (filters.minPrice) {
    listings = listings.filter(l => l.price >= parseInt(filters.minPrice));
  }
  
  if (filters.maxPrice) {
    listings = listings.filter(l => l.price <= parseInt(filters.maxPrice));
  }
  
  if (filters.amenities && filters.amenities.length > 0) {
    listings = listings.filter(l => 
      filters.amenities.every(a => l.amenities.includes(a))
    );
  }
  
  if (filters.status) {
    listings = listings.filter(l => l.status === filters.status);
  }
  
  // Sort
  if (filters.sort) {
    switch (filters.sort) {
      case 'price_asc':
        listings.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        listings.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        listings.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'popular':
        listings.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }
  }
  
  return listings;
}

// ============ CONTACT MESSAGES ============
function getContactMessages() {
  return JSON.parse(localStorage.getItem('uhs_contact_messages')) || [];
}

function saveContactMessages(contactMessages) {
  localStorage.setItem('uhs_contact_messages', JSON.stringify(contactMessages));
}

function addContactMessage(contactMsg) {
  const messages = getContactMessages();
  contactMsg.id = generateId();
  contactMsg.date = new Date().toISOString().split('T')[0];
  contactMsg.read = false;
  messages.push(contactMsg);
  saveContactMessages(messages);
  return { success: true, message: contactMsg };
}

// ============ STATISTICS ============
function getSystemStats() {
  const users = getUsers();
  const listings = getListings();
  const reviews = getReviews();
  const messages = getMessages();
  const contactMessages = getContactMessages();
  
  return {
    totalUsers: users.length,
    totalStudents: users.filter(u => u.role === 'student').length,
    totalLandlords: users.filter(u => u.role === 'landlord').length,
    totalListings: listings.length,
    availableListings: listings.filter(l => l.status === 'available').length,
    rentedListings: listings.filter(l => l.status === 'rented').length,
    pendingListings: listings.filter(l => l.status === 'pending').length,
    totalReviews: reviews.length,
    totalMessages: messages.length,
    totalContactMessages: contactMessages.length,
    totalViews: listings.reduce((acc, l) => acc + (l.views || 0), 0)
  };
}
