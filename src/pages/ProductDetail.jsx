// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single product
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading product...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 border rounded-b-2xl shadow-md  p-6">
      {/* Back Button */}
      <div className="mb-5">
        <Link to="/products">
          <button className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
            ← Back
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="h-60 w-60 object-contain mx-auto md:mx-0"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-yellow-100 mb-4">{product.description}</p>
          <p className="text-yellow-100 font-bold text-xl mb-4">
            ${product.price}
          </p>
          <p className="text-sm text-yellow-100 mb-2">
            Category: {product.category}
          </p>

          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
