# eCommerce API

This is an eCommerce API built with Node.js, Express.js, JWT for authentication, and Mongoose for MongoDB.

## Features

- User authentication with JWT (Login and Register)
- CRUD operations for products
- Cart management
- Secure endpoints with JWT middleware

## Technologies Used

- Node.js
- Express.js
- JSON Web Token (JWT)
- Mongoose
- MongoDB

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed

. Install the dependencies:

```bash
npm install
```

### Configuration

1. Create a `config.env` file in the root directory and add the following variables:

```
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the server:

```bash
npm start
```

The server will start on the port defined in your `config.env` file (default is 5000).

### API Endpoints

#### Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

#### Products

- **Get all products**: `GET /api/products`
- **Get product by ID**: `GET /api/products/:id`
- **Create product**: `POST /api/products`
- **Update product**: `PUT /api/products/:id`
- **Delete product**: `DELETE /api/products/:id`

#### Cart

- **Get user's cart**: `GET /api/cart`
- **Add item to cart**: `POST /api/cart`
- **Update item in cart**: `PUT /api/cart/:itemId`
- **Remove item from cart**: `DELETE /api/cart/:itemId`
- **Clear cart**: `DELETE /api/cart`

### Folder Structure

```
ecommerce-api/
├── config/
│   └── db.js
|   └── config.env
├── controllers/
│   ├── user.js
│   ├── product.js
│   └── cart.js
├── middleware/
│   ├── requireauth.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Cart.js
├── routes/
│   ├── user.js
│   ├── product.js
│   └── cart.js
├── .gitignore
├── package.json
├── server.js
└── README.md
```
