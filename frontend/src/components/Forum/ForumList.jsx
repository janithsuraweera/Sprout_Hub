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
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Forum</h2>
      <ul className="space-y-2">
        {forumPosts.map((post) => (
          <li key={post.id} className="border rounded p-4 hover:bg-gray-100">
            <Link to={`/forum/${post.id}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      {user && (
        <Link
          to="/forum/create"
          className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create Forum Post
        </Link>
      )}
    </div>
  );
}

export default ForumList;