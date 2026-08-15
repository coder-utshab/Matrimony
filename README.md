# Matrimony Platform

A premium full-stack online matrimony platform built using the MERN stack (MongoDB, Express, React, Node.js). 
This platform allows users to create biodatas, find their perfect life partner, and request contact information for premium profiles.

## 🚀 Features
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices.
- **Premium Dark UI**: Custom-built premium dark theme using vanilla CSS with glassmorphism (No UI libraries like DaisyUI used).
- **Authentication**: Secure email/password and Google authentication via Firebase.
- **JWT Authorization**: Protects private routes and API endpoints.
- **Role-Based Access**: Distinct user and admin dashboards.
- **Biodata Management**: Users can create, view, and edit their matrimonial biodatas.
- **Premium Memberships**: Users can request premium status to view contact details without checkout, approved by admins.
- **Contact Requests**: Secure Stripe integration for users to pay (5 USD) and request contact information of other profiles.
- **Advanced Filtering**: Filter biodatas by age range, type (Male/Female), and division.
- **Admin Analytics**: Visual pie chart representations of platform statistics and revenue tracking.
- **Success Stories**: Married couples can post success stories that are featured on the homepage.
- **Favorites**: Users can save profiles to their favorites list.

## 🛠️ Technology Stack
- **Frontend**: React 18 (Vite), React Router v6, TanStack Query, Axios, Firebase Auth, Stripe.js, Vanilla CSS.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Stripe API.

## 🔑 Admin Credentials
- **Admin Email**: admin@matrimony.com
- **Admin Password**: Admin@1234
*(Note: Please ensure this user is created and assigned the 'admin' role in your MongoDB database)*

## 🔗 Live Site URL
- **Frontend Live Site Link**: [Insert Vercel/Netlify Link Here]
- **Client Side Github Repository**: [Insert Link]
- **Server Side Github Repository**: [Insert Link]

## ⚙️ Local Development Setup

### Prerequisites
- Node.js installed
- MongoDB database (local or Atlas)
- Firebase Project
- Stripe Developer Account

### Environment Variables
**Client (`client/.env.local`)**:
```
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_sender_id
VITE_appId=your_firebase_app_id
VITE_STRIPE_PK=your_stripe_publishable_key
VITE_API_URL=http://localhost:5000
```

**Server (`server/.env`)**:
```
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Running Locally
You can use the provided `run.bat` file to start both the client and server simultaneously on Windows:
1. Double click `run.bat` in the root directory.
2. The client will run on `http://localhost:5173`
3. The server will run on `http://localhost:5000`

Alternatively, manually:
- Client: `cd client && npm run dev`
- Server: `cd server && npm start` (or `node index.js`)
