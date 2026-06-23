# ✈️ Miles & Moments | Full-Stack Travel Companion Portal

*Miles & Moments* is a premium, full-stack travel companion web application that empowers users to explore global destinations, plan custom travel budgets, and complete interactive personality quizzes. It features robust user authentication, dynamic role-based access control, automated database schema setups with Supabase PostgreSQL, and an administrative dashboard for real-time inquiry management and subscriber insights.

---

## 🌟 Live Demo Credentials (for Testing)

To easily test the application's roles and security:
* **Administrator Email:** `admin@miles.com`
* **Administrator Password:** `admin123`

*(Note: Creating a new user via the "Create an account" form will register them as a standard traveler. Admin roles can be granted directly inside the database users table).*

---

## ✨ Features

### 🔐 User Authentication & Role-Based Access Control (RBAC)
* **Secure Auth Portal**: Password-hashing with `bcrypt` on registration and secure session cookie storage.
* **Glassmorphic Page Locks**: Restricts access to premium features (Services, Budget, Quiz, Contact, and Destination Details). Unauthorized guests are prompted to sign in with an overlay that dynamically preserves their redirect URL (e.g., `destination.html?city=paris`).
* **Profile Dropdown Menu**: Groups theme controls and user settings into a sleek, responsive profile badge showing the user's initials. Admins get direct access to the management panel.

### 💼 Smart Travel Budget Planner
* **Dynamic Budgeting**: Calculates estimated lodging, dining, transit, and sightseeing costs in real-time.
* **Gauges & Visualization**: Displays cost warnings and progress bars as users adjust their spending thresholds.

### 🧠 Travel Personality Quiz
* **Interactive Survey**: A fully animated quiz mapping traveler decisions (Adventure, Culture, Luxury, Nature) to find their perfect vacation vibe.
* **Vibe Recommendations**: Displays personalized destination highlights matching their score.

### 🔧 Administrative Management Dashboard
* **Traveler Logs & Inquiries**: Dynamic table presenting user contact form submissions in real-time.
* **Subscriber Analytics**: Displays newsletter subscribers and charts for active user lists.

### 🎨 Premium UI Polish & Dynamic Theme
* **Smart Navigation Header**: Auto-collapses and hides on scroll down, revealing itself immediately on scroll up to save vertical space.
* **Dynamically Persisted Theme**: Fully responsive dark/light mode toggle with immediate inline script validation to prevent visual theme flashing (FOUC).
* **Grid Layouts**: Beautiful, modern bento grids displaying high-resolution destinations, weather badges, and micro-animations on hover.

---

## 💻 Tech Stack

* **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Grid, Flexbox), Vanilla Javascript (ES6+)
* **Backend**: Node.js, Express.js (REST API, Express-Session, Cookie Parser)
* **Database**: Supabase (PostgreSQL Client with automatic schema migration and seed checking)
* **Security**: Bcrypt (Password Hashing)

---

## 🚀 How to Run Locally

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* A Supabase PostgreSQL project (connection variables defined in `.env`).

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Aditirakesh/Miles-and-Moments.git
   cd miles-and-moments
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env` file in the root folder with:
   ```env
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_or_service_role_key
   SESSION_SECRET=your_secure_session_secret
   ```
4. Start the Node.js Express server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000/new1.html](http://localhost:3000/new1.html) in your browser.
