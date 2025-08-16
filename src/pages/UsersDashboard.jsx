import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "../hooks/useGlobalSearch";

const UsersDashboard = () => {
  const { searchTerm } = useGlobalSearch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <p className="text-center mt-6 text-white">Loading users...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
        Users Dashboard
      </h1>

      {/* Check if filtered users exist */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-white text-lg mt-8">
          ⚠️ No users found.
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-md">
            <table className="min-w-[600px] w-full text-left text-white backdrop-blur-md bg-white/10 border border-white/20 rounded-md">
              <thead className="bg-white/20">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`transition-colors border border-cyan-50 rounded-md hover:bg-white/20 ${
                      index % 2 === 0 ? "bg-white/10" : "bg-transparent"
                    }`}
                  >
                    <td className="px-4 py-3 max-w-[150px] truncate">
                      {user?.name}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {user?.email}
                    </td>
                    <td className="px-4 py-3 max-w-[150px] truncate">
                      {user?.company?.name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          navigate(`/users/${user.id}/posts`, {
                            state: { userName: user.name },
                          })
                        }
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:opacity-90 shadow-md transition"
                      >
                        View Posts
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid */}
          <div className="grid md:hidden gap-4">
            {filteredUsers.map((user) => (
              <div
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition"
                key={user.id}
              >
                <h2 className="font-semibold text-lg text-white mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-200 text-sm truncate">{user.email}</p>
                <p className="text-gray-200 text-sm truncate mb-2">
                  {user.company.name}
                </p>
                <button
                  onClick={() =>
                    navigate(`/users/${user.id}/posts`, {
                      state: { userName: user.name },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:opacity-90 shadow-md transition"
                >
                  View Posts
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersDashboard;
