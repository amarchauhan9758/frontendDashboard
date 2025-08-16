import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UsersDashboard from "./pages/UsersDashboard";
import ProductsDashboard from "./pages/ProductsDashboard";
import { SearchProvider } from "./hooks/useGlobalSearch";
import "./App.css";
import ProductDetail from "./pages/ProductDetail";
import UserPostsModal from "./components/UserPostsModal";

function App() {
  return (
    <>
      <Router>
        <SearchProvider>
          <Navbar />
          <div className="p-12">
            <Routes>
              <Route path="/" element={<UsersDashboard />} />
              <Route path="/users/:id/posts" element={<UserPostsModal />} />
              <Route path="/users" element={<UsersDashboard />} />
              <Route path="/products" element={<ProductsDashboard />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </div>
        </SearchProvider>
      </Router>
    </>
  );
}

export default App;
