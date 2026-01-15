# EasyShop - E-commerce Web Application

Easy shop ecommerce web app with a modern, user-friendly interface built with React and Tailwind CSS.

## Features

### 🛍️ Core Screens
1. **Sign In/Sign Up** - Secure user authentication with form validation
2. **Home** - Showcasing categories, recommendations, flash sales, and new arrivals
3. **Product Listing** - Advanced search and filters by price, brand, category, and rating
4. **Product Details** - Product images, descriptions, reviews, and add-to-cart functionality
5. **Shopping Cart** - Item management with quantity controls and promo code support
6. **Checkout** - Complete checkout flow with shipping and payment information
7. **User Profile** - Order tracking, address management, and wishlist

### ✨ Key Features
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 Authentication with localStorage persistence
- 🛒 Shopping cart with promo codes (SAVE10, SAVE20, WELCOME)
- ❤️ Wishlist functionality
- 🔍 Advanced product search and filtering
- ⭐ Product ratings and reviews
- 💳 Multiple payment methods (Credit Card, Cash on Delivery)
- 👤 User profile and order history
- 📱 Mobile-responsive design

## Tech Stack

- **React 19.2.0** - Modern UI framework
- **Vite 7.2.4** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Context API** - State management
- **LocalStorage** - Data persistence

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173/`

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx      # Navigation with cart/wishlist badges
│   │   ├── Footer.jsx      # Footer with links
│   │   └── Layout.jsx      # Main layout wrapper
│   └── products/
│       └── ProductCard.jsx # Reusable product card component
├── context/
│   ├── AuthContext.jsx     # Authentication state management
│   ├── CartContext.jsx     # Shopping cart state management
│   └── WishlistContext.jsx # Wishlist state management
├── data/
│   └── mockData.js         # Product catalog and reviews
├── pages/
│   ├── Home.jsx            # Home page with categories and recommendations
│   ├── SignIn.jsx          # Sign in page
│   ├── SignUp.jsx          # Sign up page
│   ├── ProductListing.jsx  # Product listing with filters
│   ├── ProductDetails.jsx  # Product details page
│   ├── Cart.jsx            # Shopping cart
│   ├── Checkout.jsx        # Checkout flow
│   ├── OrderConfirmation.jsx # Order confirmation
│   ├── Profile.jsx         # User profile and orders
│   └── Wishlist.jsx        # Wishlist page
├── App.jsx                 # Main app component with routing
└── index.css               # Global styles with Tailwind
```

## Usage

### Testing Promo Codes
Try these promo codes at checkout:
- `SAVE10` - Get 10% off your order
- `SAVE20` - Get 20% off your order
- `WELCOME` - Get 15% off your order

### Mock Authentication
- Sign up with any email and password
- Data is stored in browser localStorage
- No backend required for testing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Categories

The application includes 6 product categories:
1. Electronics
2. Fashion
3. Home & Living
4. Beauty
5. Sports
6. Books

## License

This project is open source and available under the MIT License.

