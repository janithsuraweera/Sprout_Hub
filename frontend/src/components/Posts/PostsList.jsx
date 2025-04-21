import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postService from '../../services/postService';
import authService from '../../services/authService'; // Add authService import
// Showing the post List
function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = authService.getCurrentUser(); // Get the current user

  
  useEffect(() => {
    postService
      .getAllPosts()
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  
  if(loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      {user && <Link to="/posts/create">Create Post</Link>} {/*Conditional rendering for logged in user */}
    </div>
  );
}

export default PostsList;