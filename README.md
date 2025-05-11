![image alt](https://github.com/surajmishra45/CarePoint/blob/main/Screenshot%202025-05-10%20180142.png?raw=true)

# Prescripto – Full Stack Project

A comprehensive full-stack web application featuring a frontend, backend, and admin panel. This project uses technologies like React.js, Node.js, MongoDB, Cloudinary, and optionally Stripe and Razorpay for payment integration.

---

## 📽️ Video Tutorial

Watch how to set up and run the project: [Click Here](https://youtu.be/OFFczXaS94I)

---

## 🛠️ Requirements

- Node.js: [Download Here](https://nodejs.org/en/download/)
- MongoDB Atlas account: [Register](https://www.mongodb.com/cloud/atlas/register)
- Cloudinary account: [Register](https://cloudinary.com/)
- (Optional) Stripe account: [Register](https://dashboard.stripe.com/register)
- (Optional) Razorpay account: [Register](https://accounts.razorpay.com/auth/)

---

## 🔧 Project Setup

### 1️⃣ Backend Setup

1. Open the project folder in **VS Code**
2. Right-click the `backend` folder → `Open in Integrated Terminal`
3. Run the following:
   ```bash
   npm install
   ```
4. Configure **Cloudinary**:
   - Create a Cloudinary account
   - Add the `Cloud Name`, `API Key`, and `API Secret` to `backend/.env`

5. Configure **MongoDB**:
   - Sign up on MongoDB Atlas
   - Create a new project & database (M0 Tier)
   - Create a user (avoid `@` in password)
   - Whitelist IP `0.0.0.0/0`
   - Select "Connect with Compass" and copy the connection string
   - Paste it into `backend/.env` replacing `<password>` with your DB password
   - **⚠️ Do not add a `/` at the end of the URI**

6. (Optional) Configure **Stripe**:
   - Add Stripe Secret Key to `backend/.env`

7. (Optional) Configure **Razorpay**:
   - Add Razorpay Key ID & Secret Key to `backend/.env`

8. Run the backend server:
   ```bash
   npm run server
   ```

---

### 2️⃣ Frontend Setup

1. Right-click the `frontend` folder → `Open in Integrated Terminal`
2. Run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser

---

### 3️⃣ Admin Panel Setup

1. Right-click the `admin` folder → `Open in Integrated Terminal`
2. Run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5174` in your browser

---


