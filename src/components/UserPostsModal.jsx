import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGlobalSearch } from "../hooks/useGlobalSearch";

function UserPostsModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || `User ${id}`;

  const { searchTerm } = useGlobalSearch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {userName}'s Posts
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition"
        >
          ← Back
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-white/90">Loading posts...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-white/80">No posts found.</p>
      )}

      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
          >
            {/* Post header */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {userName[0]}
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-white">{userName}</h4>
                <p className="text-xs text-gray-400">Post #{post.id}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-purple-300 mb-3">
              {post.title}
            </h3>
            <p className="text-gray-200 leading-relaxed max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-white/10">
              {post.body}
            </p>
            {/* Footer actions */}
            <div className="flex gap-6 mt-4 text-sm text-gray-300">
              <button className="hover:text-blue-400">👍 Like</button>
              <button className="hover:text-green-400">💬 Comment</button>
              <button className="hover:text-pink-400">🔗 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPostsModal;
