# 📸 Pixisphere - Photographer Booking System  

Pixisphere is a backend system where users can **find photographers** for their shoots such as **weddings, maternity, birthdays, and more.**  
It provides **secure authentication, role-based access control, and portfolio management** for photographers.  

---

## 🚀 Backend Tech Stack
- **JavaScript**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose ODM**
- **JWT (jsonwebtoken)**
- **Bcrypt.js**
- **REST APIs**
- **Cookie-Parser**
- **Multer**
- **Cloudinary**

---

## 🔑 Role-Based Access Control (RBAC)

This project includes **two types of users**:

- **👤 User**  
  - Normal user who can browse photographers.  
  - Can view photographer details like **name, email, bio, portfolio, etc.**  
  - Can **like, rate, and review** photographers.  
  - Can send **messages (coming soon)**.  
  - Can set their **profile picture**.  

- **📷 Photographer**  
  - Can set up a **professional profile & portfolio**.  
  - Can upload **portfolio images**.  
  - Can make profile **public (requires subscription)**.  
  - Can view their **likes and reviews (coming soon)**.  

---

## ✨ Features

### 🔒 Authentication & Authorization
- Secure login/signup with **JWT & bcrypt**.
- Session handling with **cookies**.  

### 👤 User Features
- Browse and view photographer profiles.
- Like photographers.
- Give ratings and reviews.
- Upload a profile picture.
- Messaging system (**coming soon**).  

### 📷 Photographer Features
- Create & manage professional profile.  
- Upload portfolio images.  
- Public profile with **subscription model (monthly/yearly)**.  
- View likes and reviews (**coming soon**).  

---

## ⚙️ Installation

1. Clone the repository
   ```
   git clone https://github.com/Santoshb22/pixisphere.git
   cd pixisphere
   npm install
   npm run dev
   
# 2. 🔧 Environment Variables
Create a .env file in the root with the following:
 - PORT=
 - MONGODB_URI=mongodb+srv://username:password@cluster0.xdnwzlt.mongodb.net
 - CORS_LINK=

# jwt
 - ACCESS_TOKEN_SECRET=
 - ACCESS_TOKEN_EXPIRY=7d
 - REFRESH_TOKEN_SECRET=
 - REFRESH_TOKEN_EXPIRY=30d

# cloudinary
 - CLOUDINARY_CLOUD_NAME=
 - CLOUDINARY_API_KEY=
 - CLOUDINARY_API_SECRET=

# 📡API Endpoints
 Postman Link: [https://documenter.getpostman.com/view/46093357/2sB3Heu3qU]
