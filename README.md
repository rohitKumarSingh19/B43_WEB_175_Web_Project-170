stunning-phoenix-3cc455.netlify.app

📅 Event Management Platform
🚀 Built with React, Node.js, Express, MongoDB & TypeScript
A fully-featured event management system with user authentication, role-based access control (RBAC), RSVP system, event notifications, reminders, and filtering.

📌 Features
✅ User Authentication (Register, Login, Logout)
✅ Role-Based Access Control (RBAC) (Admin, Organizer, Attendee)
✅ Event Creation & Management (CRUD for Admins & Organizers)
✅ RSVP System (Track attendees & responses)
✅ Event Filtering & Timeline View
✅ Event Notifications & Reminders
✅ Admin Dashboard (Manage Users & Events)
✅ Event Banner with Image Upload

🏗️ File Structure

📂 EventSphere/
│── 📂 backend/                  # Server-side (Node.js + Express + MongoDB)
│   ├── 📂 config/               # DB & server configuration
│   │   ├── db.js                # MongoDB connection setup
│   ├── 📂 controllers/          # API controllers
│   │   ├── authController.js    # User authentication (register/login)
│   │   ├── eventController.js   # Event CRUD operations
│   │   ├── notificationController.js  # Notification logic
│   │   ├── bannerController.js  # Manage homepage banner
│   ├── 📂 middleware/           # Middleware functions
│   │   ├── authMiddleware.js    # Auth protection middleware
│   │   ├── roleMiddleware.js    # Role-based access middleware
│   ├── 📂 models/               # Mongoose models
│   │   ├── User.js              # User schema
│   │   ├── Event.js             # Event schema
│   │   ├── Notification.js      # Notification schema
│   │   ├── Banner.js            # Banner schema
│   ├── 📂 routes/               # API routes
│   │   ├── authRoutes.js        # Authentication routes
│   │   ├── eventRoutes.js       # Event-related routes
│   │   ├── notificationRoutes.js # Notification routes
│   │   ├── bannerRoutes.js      # Banner-related routes
│   ├── 📂 services/             # Utility services
│   │   ├── notificationService.js # Event reminders & push notifications
│   │   ├── emailSender.js       # Send email notifications
│   ├── server.js                # Express server setup
│   ├── package.json             # Backend dependencies
│── 📂 frontend/                 # Client-side (React + Vite + TypeScript)
│   ├── 📂 src/
│   │   ├── 📂 api/               # API calls
│   │   │   ├── authApi.ts        # Auth API functions
│   │   │   ├── eventApi.ts       # Event API functions
│   │   │   ├── notificationApi.ts # Notifications API
│   │   ├── 📂 components/        # Reusable UI components
│   │   │   ├── Header.tsx        # Navigation bar
│   │   │   ├── Footer.tsx        # Footer component
│   │   │   ├── Banner.tsx        # Event banner
│   │   │   ├── NotificationList.tsx # Display notifications
│   │   ├── 📂 context/           # React context API
│   │   │   ├── NotificationContext.tsx # Notification state
│   │   ├── 📂 pages/             # Main pages
│   │   │   ├── Home.tsx          # Homepage (Event Timeline + Filters)
│   │   │   ├── EventCreate.tsx   # Event creation page
│   │   │   ├── Login.tsx         # User login page
│   │   │   ├── Register.tsx      # User registration page
│   │   │   ├── AdminDashboard.tsx # Admin panel
│   │   │   ├── Notifications.tsx # Notification center
│   │   ├── App.tsx               # Main React component
│   │   ├── main.tsx              # App entry point
│   ├── package.json              # Frontend dependencies
│── .env                          # Environment variables
│── README.md                     # Project documentation
│── package.json                   # Root dependencies
│── .gitignore                     # Ignore unnecessary files


⚡ Tech Stack
Frontend
Vite + React (Fast UI Rendering)

TypeScript (Strict typing for better code)

React Router (Navigation & routing)

MUI (Material-UI) (Responsive UI components)

Axios (API handling)

Backend
Node.js + Express.js (REST API)

MongoDB + Mongoose (Database)

JWT (JSON Web Tokens) (Authentication & security)

🚀 Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/your-username/event-management-platform.git
cd event-management-platform
cd backend
npm install

cd frontend
npm install
🎯 API Endpoints
1️⃣ Authentication
METHOD	ENDPOINT	DESCRIPTION	ACCESS
POST	/api/auth/register	Register new user	Public
POST	/api/auth/login	Login user	Public
GET	/api/auth/profile	Get user details	Private



