import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://20.244.56.144/evaluation-service/users",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNzQ1MzgyLCJpYXQiOjE3NDM3NDUwODIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImZjYmIyNGEyLTMyM2EtNDU5OS04ODY4LWUyNmMzMGE0YTFhMiIsInN1YiI6ImUyMmNzZXUwODI5QGJlbm5ldHQuZWR1LmluIn0sImVtYWlsIjoiZTIyY3NldTA4MjlAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoia2FydGlrZXkiLCJyb2xsTm8iOiJlMjJjc2V1MDgyOSIsImFjY2Vzc0NvZGUiOiJydENIWkoiLCJjbGllbnRJRCI6ImZjYmIyNGEyLTMyM2EtNDU5OS04ODY4LWUyNmMzMGE0YTFhMiIsImNsaWVudFNlY3JldCI6IkRDZnpmdEFoQXdxWnFra20ifQ.aBY2hYkUwHgTFXdFTL_sYge8afkfHfn-cIbgkUMUWFU",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Social Media Users
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <ul className="max-w-xl mx-auto space-y-4">
          {Object.entries(users).map(([id, name]) => (
            <li
              key={id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://source.unsplash.com/random/50x50?sig=${id}`}
                  alt="User Avatar"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <span className="font-medium text-lg">{name}</span>
              </div>
              <span className="text-gray-400 text-sm">ID: {id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
