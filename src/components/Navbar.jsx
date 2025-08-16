import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useGlobalSearch } from "../hooks/useGlobalSearch";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { searchTerm, updateSearch } = useGlobalSearch();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-900 via-gray-900 to-black text-white shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-wide hover:text-purple-300 transition"
          >
            Dashboard
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 mx-6">
            <input
              type="text"
              placeholder="🔍 Search..."
              className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 shadow backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/users"
              className="px-3 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Users
            </Link>
            <Link
              to="/products"
              className="px-3 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Products
            </Link>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 transition"
              >
                <User size={20} className="mr-2" /> Admin
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-lg py-2">
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-white/20 transition"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-white/20 transition"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-red-500 transition rounded-b-lg"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed left-0 right-0 top-16 bg-gradient-to-r from-purple-900 via-gray-900 to-black px-4 py-4 space-y-3 shadow-lg backdrop-blur-md">
          {/* Mobile Search */}
          <input
            type="text"
            placeholder="🔍 Search..."
            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 shadow backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={searchTerm}
            onChange={(e) => updateSearch(e.target.value)}
          />

          {/* Mobile Links */}
          <Link
            to="/users"
            className="block px-3 py-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="block px-3 py-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          <Link
            to="/logout"
            className="block px-3 py-2 rounded-lg hover:bg-red-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
