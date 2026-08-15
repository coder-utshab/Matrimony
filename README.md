# 💍 Matrimony — Premium Online Matchmaking Platform

> A full-stack matrimony platform built with the MERN stack where users can create biodatas, browse profiles, connect with potential life partners, and share their success stories.

---

## 🌐 Live Site & Repository Links

| Resource | Link |
|----------|------|
| 🔗 **Frontend Live Site** | *Add your Vercel link here* |
| 📁 **Client Repository** | *Add your GitHub client repo link here* |
| 📁 **Server Repository** | *Add your GitHub server repo link here* |

---

## 🔑 Admin Credentials

| Field | Value |
|-------|-------|
| **Admin Email** | `admin@gmail.com` |
| **Admin Password** | `password` |

**Normal User Credentials:**

| Field | Value |
|-------|-------|
| **User Email** | `user@gmail.com` |
| **User Password** | `password` |

> ⚠️ Register both accounts through the site's Register page. Then manually set `role: "admin"` for the admin account in MongoDB Atlas (`users` collection).

---

## ✨ Key Features

- 🎨 **Premium Dark UI** — Custom glassmorphism design with gradient accents, micro-animations, and responsive layouts. No DaisyUI used — 100% custom CSS.
- 🔐 **Firebase Authentication** — Supports Email/Password login and Google Sign-In with automatic JWT token generation on login.
- 🔒 **JWT Authorization** — All private API routes are protected with JSON Web Tokens stored in localStorage.
- 👤 **Biodata Management** — Users can create or edit their full matrimony biodata with 17+ fields including height, weight, race, division, and partner preferences.
- 🏅 **Premium Membership System** — Users can request premium status. Admins approve it, which unlocks contact info for others viewing the profile.
- 💳 **Stripe Payment Integration** — Normal users pay $5 via Stripe to request contact info of a profile. The request goes to admin for approval.
- 🔍 **Advanced Filtering & Pagination** — Filter biodatas by type (Male/Female), division, and age range. Paginated results (20 per page).
- ❤️ **Favourites List** — Users can save profiles to a personal favourites list and manage them from the dashboard.
- 💌 **Contact Request System** — Paid contact requests are tracked in a dashboard showing pending/approved status with locked/unlocked info.
- 📊 **Admin Analytics Dashboard** — Visual pie chart (Recharts) showing total, male, female, and premium biodata counts plus total revenue.
- 👥 **Manage Users (Admin)** — Admins can search users by name (server-side) and promote them to Admin or Premium.
- 💕 **Got Married / Success Stories** — Couples can submit their story with couple image, marriage date, and star rating. Stories are featured on the homepage carousel.
- 🔔 **Toast & SweetAlert2 Notifications** — All CRUD operations, login, signup, payments, and approvals show styled toast or SweetAlert2 popups. No browser default alerts.
- 📱 **Fully Responsive** — Mobile, tablet, and desktop views supported for all pages including the dashboard.
- ♻️ **TanStack Query** — All GET requests use `@tanstack/react-query` for caching, background refetching, and loading states.
- 🔄 **Axios Interceptor** — Automatically attaches JWT tokens to all secure requests and handles 401/403 auto-logout.
- 🛡️ **Environment Variables** — Firebase config keys and MongoDB credentials are stored securely in `.env` and `.env.local` files.
- 🏠 **Private Routes** — Biodata Details and Checkout pages are private. Logged-out users are redirected to login and returned after authentication.
- 📝 **Auto Biodata ID** — Server-side auto-incremented Biodata IDs (1, 2, 3...) generated based on last created entry.
- 🎯 **Similar Profiles** — Biodata detail pages show up to 3 similar profiles of the same type at the bottom.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 + Vite | UI Framework |
| React Router v6 | Client-side Routing |
| TanStack Query v5 | Data Fetching & Caching |
| Axios + Interceptor | HTTP Client with JWT |
| Firebase Auth | Authentication |
| @stripe/react-stripe-js | Payment Integration |
| Swiper.js | Banner & Story Carousels |
| Recharts | Admin Pie Chart |
| react-countup | Animated Stat Counters |
| react-intersection-observer | Scroll Triggers |
| react-hot-toast | Toast Notifications |
| SweetAlert2 | Confirm Dialogs |
| react-icons | Icon Library |
| Vanilla CSS | Styling (No DaisyUI) |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | Server |
| MongoDB (Atlas) | Database |
| jsonwebtoken (JWT) | Auth Token |
| Stripe API | Payment Processing |
| dotenv | Environment Variables |
| cors | Cross-Origin Requests |

---

## 📁 Project Structure

```
Matrimony/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/         # Responsive sticky navbar
│   │   │   ├── Footer/         # Styled footer with social links
│   │   │   ├── Banner/         # Swiper hero slider
│   │   │   ├── PremiumCards/   # 6 premium member cards w/ sort
│   │   │   ├── HowItWorks/     # 4-step process section
│   │   │   ├── SuccessCounter/ # Animated counters
│   │   │   ├── SuccessStory/   # Story carousel
│   │   │   └── Shared/         # PrivateRoute, AdminRoute
│   │   ├── hooks/
│   │   │   ├── useAxiosPublic.js
│   │   │   ├── useAxiosSecure.js   # JWT Interceptor
│   │   │   ├── useAdmin.js
│   │   │   └── usePremium.js
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── DashboardLayout.jsx # Collapsible sidebar
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Biodatas/           # Filter + Pagination
│   │   │   ├── BiodataDetails/     # Private route
│   │   │   ├── Checkout/           # Stripe payment
│   │   │   ├── Login/ Register/
│   │   │   ├── AboutUs/ ContactUs/
│   │   │   └── Dashboard/
│   │   │       ├── EditBiodata/
│   │   │       ├── ViewBiodata/    # Premium request
│   │   │       ├── MyContactRequest/
│   │   │       ├── FavouritesBiodata/
│   │   │       ├── GotMarried/     # Submit success story
│   │   │       ├── AdminDashboard/ # Pie chart + stats
│   │   │       ├── ManageUsers/    # Search + promote
│   │   │       ├── ApprovedPremium/
│   │   │       ├── ApprovedContactRequest/
│   │   │       └── SuccessStoryAdmin/
│   │   ├── providers/
│   │   │   └── AuthProvider.jsx
│   │   ├── router/router.jsx
│   │   ├── firebase/firebase.config.js
│   │   ├── index.css               # 2400+ line design system
│   │   └── App.jsx
│   └── .env.local                  # Firebase + Stripe keys
│
├── server/                     # Express Backend
│   ├── index.js                # All routes in one file
│   ├── .env                    # MongoDB + JWT + Stripe secrets
│   └── package.json
│
├── run.bat                     # One-click start script
└── README.md
```

---

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Firebase project with Email/Password + Google auth enabled
- Stripe developer account (test mode)

### 1. Clone the Repository
```bash
git clone <your-client-repo-url>
git clone <your-server-repo-url>
```

### 2. Configure Environment Variables

**Server** — create `server/.env`:
```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=any_long_random_secret_string
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

**Client** — create `client/.env.local`:
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_STRIPE_PK=pk_test_your_stripe_publishable_key
VITE_API_URL=http://localhost:5000
```

### 3. Update MongoDB URI in `server/index.js`
Replace `cluster0.xxxxx.mongodb.net` with your actual MongoDB Atlas cluster address.

### 4. Run the Project

**Option A — One-click (Windows):**
```
Double-click run.bat
```

**Option B — Manual:**
```bash
# Terminal 1 — Backend
cd server
npm start

# Terminal 2 — Frontend
cd client
npm run dev
```

### 5. Open in Browser
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 🗄️ Database Collections

| Collection | Description |
|-----------|-------------|
| `users` | User accounts with role (user/admin) and isPremium flag |
| `biodatas` | All matrimony biodatas with auto-incremented biodataId |
| `favourites` | User-saved favourite biodata references |
| `contactRequests` | Paid contact requests with pending/approved status |
| `payments` | Stripe payment records with transactionId |
| `successStories` | Couple success stories with image, date, stars |
| `premiumRequests` | Pending premium upgrade requests for admin review |

---

## 🚀 Deployment Guide

### Frontend → Vercel
1. Push `client/` folder to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add all `.env.local` variables as Vercel Environment Variables
4. Set `VITE_API_URL` to your deployed server URL

### Backend → Render
1. Push `server/` folder to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Set build command: `npm install`
4. Set start command: `node index.js`
5. Add all `.env` variables in Render dashboard
6. Update `cors` origin in `index.js` to your Vercel frontend URL

---

## 👨‍💻 Developer Notes

- After deploying, go to Firebase Console → Authentication → Authorized Domains → add your Vercel domain
- Register `admin@gmail.com` through the Register page, then manually update their `role` to `"admin"` in MongoDB Atlas
- Register `user@gmail.com` through the Register page as a normal test user
- Use Stripe test card `4242 4242 4242 4242` (any future expiry, any CVC) for testing payments
- The app uses **mock/fallback data** when the database is empty — so the UI looks great even before seeding
