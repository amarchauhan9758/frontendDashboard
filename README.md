# Frontend Dashboard

A responsive **Frontend Dashboard** built with **React**, **Tailwind CSS**, and **React Router**, featuring global search functionality, user and product management, and a modern, glassmorphism-inspired UI.

---

## Features

- **Users Dashboard**

  - View a list of users fetched from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)
  - Responsive table on desktop and grid cards on mobile
  - Search users by name globally

- **Products Dashboard**

  - Display products fetched from [Fake Store API](https://fakestoreapi.com/products)
  - Filter by category and sort by price
  - Global search works across products

- **Global Search**

  - Search bar in the navbar works for users, products, and future modules
  - Mobile and desktop responsive

- **Navbar**

  - Responsive navigation with logo, search, menu items, and profile dropdown
  - Mobile hamburger menu with search and navigation links

- **Profile Menu**

  - Options for Profile, Settings, and Logout

- **Responsive Design**

  - Desktop: table/grid layout
  - Mobile: card/grid layout
  - Smooth hover effects and transitions

- **Clean UI**
  - Tailwind CSS with glassmorphism and gradient backgrounds

---

## Project Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── UserPostsModal.jsx
├── hooks/
│ └── useGlobalSearch.js
├── pages/
│ ├── UsersDashboard.jsx
│ └── ProductDashboard.jsx
|\_\_ ProductDetails.jsx
├── App.jsx
├── index.js

- **`components/`** → Reusable UI components like Navbar, modals.
- **`hooks/`** → Custom hooks like `useGlobalSearch` for global search state.
- **`pages/`** → Dashboard pages for users and products.

---

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/frontend-dashboard.git
cd frontend-dashboard
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Start the development server:

bash
Copy
Edit
npm start
# or
yarn start
Open http://localhost:3000 in your browser.
```
