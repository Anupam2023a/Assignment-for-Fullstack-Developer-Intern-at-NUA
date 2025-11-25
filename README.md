# User Management System - Full Stack Application 

A complete full-stack web application built for a Fullstack Developer Intern assignment for NUA. Features a modern Vue.js frontend with Vuetify UI components and a robust Node.js backend with MySQL database.

![User Management System](https://img.shields.io/badge/Status-Completed-success)
![Vue.js](https://img.shields.io/badge/Vue.js-2.6.14-green)
![Node.js](https://img.shields.io/badge/Node.js-Express-blue)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange)

## 🚀 Live Demo
*Application demo available at: http://localhost:8080 (after local setup)*

## 📋 Assignment Requirements Met

### ✅ Backend (Node.js + Express + MySQL)
- [x] Fetch data from RandomUser API (https://randomuser.me/api/)
- [x] Store 1000 user records in MySQL database
- [x] RESTful API endpoints for CRUD operations
- [x] Proper error handling and validation

### ✅ Frontend (Vue.js + Vuetify)
- [x] Display users in Vuetify data table
- [x] 25 rows per page with pagination
- [x] Edit user functionality with dialog
- [x] Search/filter across all columns (Name, Email, City)
- [x] Responsive and modern UI design

## 🛠️ Tech Stack

### Frontend
- **Vue.js 2** - Progressive JavaScript framework
- **Vuetify** - Material Design component framework
- **Axios** - HTTP client for API calls
- **Vue-Axios** - Axios integration for Vue

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database management
- **MySQL2** - MySQL client for Node.js
- **Axios** - HTTP client for external API calls

## 📁 Project Structure

```

fullstack-intern-app/
├──backend/
│├── config/
││   └── database.js          # Database configuration
│├── models/
││   └── user.js              # User model and database operations
│├── routes/
││   └── users.js             # API routes for user operations
│├── package.json             # Backend dependencies
│└── server.js                # Main server file
├──frontend/
│├── public/
││   └── index.html           # Main HTML template
│├── src/
││   ├── components/
││   │   └── UserTable.vue    # Main user table component
││   ├── services/
││   │   └── api.js           # API service layer
││   ├── App.vue              # Root Vue component
││   └── main.js              # Vue application entry point
│└── package.json             # Frontend dependencies
└──README.md                    # Project documentation

```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/user-management-system.git
cd user-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure database (update with your MySQL credentials)
# Edit backend/config/database.js with your MySQL settings

# Start the backend server
npm run dev
```

Backend will run on: http://localhost:5000

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run serve
```

Frontend will run on: http://localhost:8080

📊 API Endpoints

Method Endpoint Description
POST /api/users/fetch Fetch 1000 users from RandomUser API and store in database
GET /api/users Retrieve all users from database
PUT /api/users/:uuid Update user information (name, email, city)
GET /health Health check endpoint

## 🎯 Features

### User Management

· Fetch Users: Import 1000 random users from external API
· View Users: Display in a clean, paginated table
· Edit Users: Update user details with intuitive dialog
· Search Users: Real-time filtering across all columns

### UI/UX Features

· Responsive Design: Works on desktop and mobile devices
· Modern Interface: Clean Vuetify Material Design
· Pagination: 25 users per page with navigation
· Real-time Feedback: Success/error messages and loading states

### Database Features

· MySQL Integration: Efficient data storage and retrieval
· Automatic Setup: Database and tables created automatically
· Data Integrity: UUID-based unique identifiers

### 🎨 UI Components

· Header: Professional gradient header with application title
· Statistics Cards: Display total users, filtered count, and unique cities
· Data Table: Vuetify enhanced table with sorting and pagination
· Search Bar: Real-time search across name, email, and city fields
· Edit Dialog: Modal form for updating user information
· Notifications: Snackbar messages for user actions

## 🔧 Configuration

### Database Configuration

Update backend/config/database.js with your MySQL credentials:

```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'user_management'
};
```

### API Configuration

Frontend API base URL in frontend/src/services/api.js:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🐛 Troubleshooting

### Common Issues

1. MySQL Connection Error: Verify MySQL service is running and credentials are correct
2. Port Already in Use: Change ports in server.js (backend) or vue.config.js (frontend)
3. CORS Issues: Backend includes CORS middleware for development
4. Icons Not Showing: Install Material Design Icons: npm install @mdi/font

### Backend Not Starting?

· Check if MySQL is running
· Verify database credentials
· Check port 5000 is available

### Frontend Not Connecting?

· Ensure backend is running on port 5000
· Check browser console for CORS errors
· Verify API base URL in frontend services

## 📝 Development Notes

### Key Implementation Details

· UUID Management: Uses login.uuid from RandomUser API as primary key
· Error Handling: Comprehensive error handling in both frontend and backend
· Data Validation: Input validation for user updates
· Duplicate Prevention: Handles duplicate UUID entries gracefully

### Assignment Compliance

This project fully satisfies all specified requirements:

· ✅ Backend fetches from public API and provides own APIs
· ✅ Frontend consumes backend APIs only
· ✅ Vuetify table with editable fields
· ✅ All specified API endpoints implemented
· ✅ Search/filter functionality across all columns

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### 📄 License

This project was developed as part of a Fullstack Developer Intern assignment for NUA.

# 👨‍💻 Author : ANUPAM ANAND
