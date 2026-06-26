# 🏠 UniHouse Kenya - University House Hunting System

A comprehensive web application for finding student accommodation near Kenyan universities. Built with pure HTML, CSS, and JavaScript with LocalStorage for data persistence.

## Features

### 👨‍🎓 Student Features
- Browse houses near multiple Kenyan universities
- Advanced search & filtering (price, type, location, amenities)
- Interactive map showing houses near universities (Leaflet.js)
- Bookmark favorite listings
- Submit reviews & ratings
- Contact landlords via messaging
- Personalized dashboard

### 🏢 Landlord Features
- Register and manage landlord account
- Post new house listings with photos
- Manage listing status (Available/Rented/Pending)
- View and respond to student inquiries
- Track listing views and performance
- Landlord dashboard with statistics

### 👑 Admin Features
- System overview with statistics
- User management (view/delete users)
- Listing management (change status, delete)
- University management (add/delete universities)
- Review moderation (delete inappropriate reviews)
- Progress bars and analytics

## Universities Covered
1. **Chuka University** - Chuka
2. **Tharakanithi University** - Kathwana
3. **University of Embu** - Embu
4. **Meru University of Science & Technology** - Meru
5. **Dedan Kimathi University of Technology** - Nyeri
6. **Karatina University** - Karatina
7. **Nyeri National Polytechnic** - Nyeri
8. **Mount Kenya University (Main Campus)** - Thika
9. **Kenya Methodist University** - Meru
10. **Embu College (TECH)** - Embu

## Tech Stack
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript
- **Maps:** Leaflet.js (OpenStreetMap)
- **Icons:** Font Awesome 6
- **Data Storage:** Browser LocalStorage
- **Images:** Unsplash (placeholder images)

## How to Run
Simply open `index.html` in any modern web browser. No server or build tools required.

### Quick Start
1. Clone or download the project
2. Open `index.html` in your browser
3. Register as a student or landlord to get started
4. Browse available houses near your university

### Test Accounts (Create by registering)
- **Student:** Register with role "Student"
- **Landlord:** Register with role "Landlord"
- **Admin:** Register with email containing "admin" (the system auto-detects admin role)

## Project Structure
```
university-house-hunting/
├── index.html           # Home page with hero search
├── auth.html            # Login / Register page
├── dashboard.html       # User dashboard (Student/Landlord)
├── listings.html        # Browse & search houses with map
├── listing-detail.html  # House details, reviews, contact
├── post-listing.html    # Landlord post new listing
├── admin.html           # Admin panel
├── css/
│   └── style.css        # All styles
├── js/
│   ├── data.js          # Data layer & LocalStorage CRUD
│   └── utils.js         # Utility functions & UI components
└── images/              # Image directory
```

## Sample Data
The system comes pre-loaded with:
- 10 universities with location coordinates
- 10 sample house listings with images, prices, and amenities
- 5 sample reviews

## License
MIT License - free to use and modify