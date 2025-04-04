import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPost from "./UserPost";
import { useParams } from "react-router-dom";
import Users from "./User";
import LastEndPoint from "./LastEndPoint";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:userId/posts" element={<UserPostsWrapper />} />
        <Route path="/" element={<Users />} />
        <Route path="/posts/:postId/comments" element={<LastEndPoint />} />
        {/* You can add other routes here too */}
      </Routes>
    </Router>
  );
}

// Wraps UserPosts so we can read the userId from the route
function UserPostsWrapper() {
  const { userId } = useParams();
  return <UserPost userId={userId} />;
}

export default App;
