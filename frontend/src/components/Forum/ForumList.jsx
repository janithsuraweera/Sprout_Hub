import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import forumService from '../../services/forumService';
import authService from '../../services/authService';

function ForumList() {
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = authService.getCurrentUser();

  useEffect(() => {
    forumService
      .getAllForumPosts()
      .then((response) => {
        setForumPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Forum</h2>
      <ul>
        {forumPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/forum/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      {user && <Link to="/forum/create">Create Forum Post</Link>}
    </div>
  );
}

export default ForumList;