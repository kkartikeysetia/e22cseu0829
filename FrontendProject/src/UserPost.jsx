import React, { useEffect, useState } from "react";

function UserPosts({ userId = 1 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `http://20.244.56.144/evaluation-service/users/${userId}/posts`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNzQ2MTg1LCJpYXQiOjE3NDM3NDU4ODUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImZjYmIyNGEyLTMyM2EtNDU5OS04ODY4LWUyNmMzMGE0YTFhMiIsInN1YiI6ImUyMmNzZXUwODI5QGJlbm5ldHQuZWR1LmluIn0sImVtYWlsIjoiZTIyY3NldTA4MjlAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoia2FydGlrZXkiLCJyb2xsTm8iOiJlMjJjc2V1MDgyOSIsImFjY2Vzc0NvZGUiOiJydENIWkoiLCJjbGllbnRJRCI6ImZjYmIyNGEyLTMyM2EtNDU5OS04ODY4LWUyNmMzMGE0YTFhMiIsImNsaWVudFNlY3JldCI6IkRDZnpmdEFoQXdxWnFra20ifQ.riO4C_9cqONLa7RuZPzKmbLlym-CdekKFBWMTfrG5dE",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Posts by User {userId}
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts found.</p>
      ) : (
        <ul className="max-w-2xl mx-auto space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
            >
              <p className="font-medium text-gray-800">#{post.id}</p>
              <p className="text-gray-600">{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserPosts;
