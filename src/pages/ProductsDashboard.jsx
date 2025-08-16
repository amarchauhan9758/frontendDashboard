import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalSearch } from "../hooks/useGlobalSearch";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const { searchTerm } = useGlobalSearch();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);

        const uniqueCategories = [
          "all",
          ...new Set(data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Apply search, filter, and sort
  const filteredProducts = products
    .filter(
      (p) =>
        (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "all" ? true : p.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen px-4 pt-24 ">
      <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
        🛒 Product Dashboard
      </h2>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-xl backdrop-blur-md bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-black/80 border border-purple-500/30 text-purple-200 shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none cursor-pointer"
        >
          {categories.map((cat, idx) => (
            <option
              key={idx}
              value={cat}
              className="bg-gray-900 text-purple-200"
            >
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-xl backdrop-blur-md bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-black/80 border border-purple-500/30 text-purple-200 shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none cursor-pointer"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-white/80 mt-8">No results found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain mb-3"
              />
              <h3 className="text-sm font-semibold text-white mb-1">
                {product.title}
              </h3>
              <p className="text-gray-300 text-sm mb-1">{product.category}</p>
              <p className="text-lg font-bold text-green-400">
                ${product.price}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400">⭐</span>
                <span className="ml-1 text-sm text-gray-200">
                  {product.rating?.rate}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  ({product.rating?.count} reviews)
                </span>
              </div>
              <button className="bg-purple-500 w-full p-2 rounded-lg shadow-2xl">
                Buy Now
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
