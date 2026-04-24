# 🧸 ToyVerse — Where Play Comes Alive

A modern, visually stunning toy store eCommerce frontend built with React (Vite), Tailwind CSS, and Framer Motion.

![ToyVerse Banner](https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1200&h=400&fit=crop)

---

## ✨ Features

### 🎨 Design
- Playful, colorful brand identity with custom Boogaloo + Nunito fonts
- Dark / Light mode toggle (persisted in localStorage)
- Fully responsive: mobile-first through desktop
- Smooth Framer Motion animations on every page
- Glassmorphism cards, gradient buttons, floating blobs, shimmer skeletons

### 📄 Pages
| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, categories, featured products, promo, testimonials, newsletter |
| **Shop** | `/shop` | Filter by category, search, price range, sort, grid/list view |
| **Product Details** | `/product/:id` | Image gallery, qty selector, related products |
| **Cart** | `/cart` | Full cart management, order summary, free shipping threshold |
| **Login** | `/login` | Animated form with demo credentials |
| **Register** | `/register` | Password strength meter, validation |
| **About** | `/about` | Team, values, timeline, mission |
| **Contact** | `/contact` | Contact form with FAQ accordion |
| **Admin** | `/admin` | Full product CRUD dashboard (admin only) |

### 🛒 Functionality
- Cart with localStorage persistence + live item count badge
- Mock authentication (user + admin roles)
- Product search, category filter, price range, sort
- Admin dashboard: add/edit/delete products, toggle Hot Deal / Best Seller / New
- Toast notifications (react-hot-toast)
- Frontend validation on all forms

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or unzip the project
cd toyverse

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@toyverse.com | admin123 |
| **User** | user@toyverse.com | user123 |

> Admin gets access to `/admin` — the product management dashboard.

---

## 🗂️ Project Structure

```
toyverse/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── App.jsx               # Router setup
    ├── main.jsx
    ├── index.css             # Global styles + Tailwind
    ├── assets/images/        # Place product images here
    ├── components/
    │   ├── Navbar.jsx        # Sticky, transparent→solid
    │   ├── Footer.jsx        # 4-column with social links
    │   ├── ProductCard.jsx   # Hover effects, quick view
    │   ├── Loader.jsx        # Page loader + skeleton cards
    │   └── Modal.jsx         # Animated overlay
    ├── context/
    │   ├── CartContext.jsx   # Cart state + localStorage
    │   ├── AuthContext.jsx   # Mock authentication
    │   └── ThemeContext.jsx  # Dark/light mode
    ├── data/
    │   └── products.js       # 12 products, categories, testimonials
    ├── hooks/
    │   ├── useProducts.js    # Filter/search/sort logic
    │   └── useScrolled.js    # Scroll detection for navbar
    ├── layouts/
    │   └── MainLayout.jsx    # Navbar + Footer wrapper
    └── pages/
        ├── Home.jsx
        ├── Shop.jsx
        ├── ProductDetails.jsx
        ├── Cart.jsx
        ├── Login.jsx
        ├── Register.jsx
        ├── About.jsx
        ├── Contact.jsx
        └── AdminDashboard.jsx
```

---

## 🧩 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **React Router v6** | Routing |
| **Context API** | State (cart, auth, theme) |
| **Lucide React** | Icons |
| **React Hot Toast** | Notifications |

---

## 🖼️ Adding Real Images

All product images are loaded from Unsplash URLs by default. To use local images:

1. Place your images in `/src/assets/images/`
2. Update image paths in `/src/data/products.js`:

```js
// Before
image: 'https://images.unsplash.com/...'

// After
image: '/src/assets/images/rocket-blaster.jpg'
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| Mobile (`< 640px`) | Single column, hamburger menu |
| Tablet (`640–1024px`) | 2-column grid |
| Desktop (`> 1024px`) | 3-4 column grid, sidebar filters |

---

## 🎯 Portfolio Notes

This project demonstrates:
- Component architecture & reusability
- State management with Context API
- Responsive design patterns
- Animation & UX polish
- Form validation
- localStorage persistence
- Role-based routing (admin access)
- Modern React patterns (hooks, functional components)

---

Made with ❤️ for ToyVerse
