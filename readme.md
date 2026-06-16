# 🛍️ Shoppers -Simple E-Commerce Platform

>Shoppers is a full-stack e-commerce web application built with the MERN stack. This internship project demonstrates modern web development practices, including responsive UI design, RESTful APIs, and database management.

>This application allows users to browse products, view product details,add products to a shopping cart,register/login and place orders.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

---

## ✨ Features

### Customer Features
- 🛒 **Shopping Cart** - Add/remove products from cart
- 🔍 **Product Browsing** - Browse products by category
- 👤 **User Authentication** - Login and signup functionality
- 💳 **Product Details** - Detailed product information with pricing
- 🏷️ **New Collections** - Featured new products
- 📧 **Newsletter** - Subscribe to updates

### Admin Features
- 📊 **Admin Dashboard** - Manage products and inventory
- ➕ **Add Products** - Create and upload new products
- ❌ **Remove Products** - Delete products from catalog
- 📈 **Product Management** - Edit product details

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **CSS3** - Styling
- **React Router DOM** - Client-side routing
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **RESTful API** - API architecture

### Tools & Platforms
- **npm** - Package manager
- **Git** - Version control

---

## 📁 Project Structure

```
Shoppers/
├── frontend/                      # React application
│   ├── public/
│   ├── src/
│   │   ├── Components/           # Reusable UI components
│   │   │   ├── Navbar/
│   │   │   ├── Hero/
│   │   │   ├── ProductDisplay/
│   │   │   ├── CartItems/
│   │   │   ├── Footer/
│   │   │   └── ...
│   │   ├── Pages/                # Page components
│   │   │   ├── Shop.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── LoginSignup.jsx
│   │   │   └── ...
│   │   ├── Context/              # Context API setup
│   │   │   └── ShopContext.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/                       # Express API server
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   └── package.json
├── admin/                         # Admin dashboard
└── readme.md
```


## 💻 Usage

### Running the Application

#### Terminal 1 - Start Backend Server
```bash
cd backend
node index.js
```
✅ Backend runs on `http://localhost:5000`

#### Terminal 2 - Start Frontend Application
```bash
cd frontend
npm start
```
✅ Frontend runs on `http://localhost:3000`

#### Terminal 3 - Start Admin Dashboard (Optional)
```bash
cd admin
npm run dev
```
✅ Admin Dashboard runs on `http://localhost:5173`

### Application Workflow

1. **Browse Products**
   - Visit `http://localhost:3000`
   - Browse products by category (Men, Women, Kids)
   - Click on any product to view details

2. **Add to Cart**
   - Click "ADD TO CART" on product page
   - Select size and quantity
   - View cart by clicking cart icon

3. **Checkout**
   - View all items in cart
   - Modify quantities or remove items
   - Proceed to checkout (integration ready)

4. **User Authentication**
   - Sign up for a new account
   - Login with credentials
   - Access personalized features

5. **Admin Dashboard**
   - Access admin panel at `http://localhost:3001`
   - Add new products to catalog
   - Manage existing products
   - Remove products from inventory

---


