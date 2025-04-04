import React, { useEffect, useState } from "react";

function LastEndPoint({ postId = 1 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsMap, setCommentsMap] = useState({});

  const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNzQ3Nzc0LCJpYXQiOjE3NDM3NDc0NzQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImZjYmIyNGEyLTMyM2EtNDU5OS04ODY4LWUyNmMzMGE0YTFhMiIsInN1YiI6ImUyMmNzZXUwODI5QGJlbm5ldHQuZWR1LmluIn0sImVtYWlsIjoiZTIyY3NldTA4MjlAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoia2FydGlrZXkiLCJyb2xsTm8iOiJlMjJjc2V1MDgyOSIsImFjY2Vzc0NvZGUiOiJydENIWkoiLCJjbGllbnRJRCI6ImZjYmIyNGEyLTMyM2EtNDU5OS04ODY4LWUyNmMzMGE0YTFhMiIsImNsaWVudFNlY3JldCI6IkRDZnpmdEFoQXdxWnFra20ifQ.TCx0LHx0cZ6HKA8kp0_nrw2tNNkEqx4zbALrRcpgv_0";

  const fetchUserPosts = async () => {
    try {
      const res = await fetch(
        `http://20.244.56.144/evaluation-service/posts/${postId}/comments`,
        {
          headers: { Authorization: TOKEN },
        }
      );

      const data = await res.json();
      const posts = data.posts || [];
      setPosts(posts);

      const commentResults = await Promise.all(
        posts.map(async (post) => {
          const commentRes = await fetch(
            `http://20.244.56.144/evaluation-service/posts/${postId}/comments`,
            { headers: { Authorization: TOKEN } }
          );
          const commentData = await commentRes.json();
          return { postId: post.id, comments: commentData.comments || [] };
        })
      );

      const map = {};
      commentResults.forEach(({ postId, comments }) => {
        map[postId] = comments;
      });

      setCommentsMap(map);
    } catch (error) {
      console.error("Error fetching posts or comments:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [postId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Posts by User {postId}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts & comments...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">
          No posts found for this user.
        </p>
      ) : (
        <ul className="max-w-2xl mx-auto space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
            >
              <p className="font-semibold text-gray-800 mb-1">#{post.id}</p>
              <p className="text-gray-700 mb-3">{post.content}</p>

              <div className="ml-4">
                <p className="text-sm text-gray-500 mb-1">Comments:</p>
                {commentsMap[post.id]?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {commentsMap[post.id].map((comment) => (
                      <li key={comment.id} className="text-sm text-gray-600">
                        {comment.content}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LastEndPoint;
