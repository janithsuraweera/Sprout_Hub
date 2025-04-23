import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import forumService from '../../services/forumService';
import authService from '../../services/authService';

function ForumPostDetails() {
  const [forumPost, setForumPost] = useState(null);
  const { id } = useParams();
  const user = authService.getCurrentUser();

  useEffect(() => {
    forumService.getForumPostById(id).then((response) => {
      setForumPost(response.data);
    });
  }, [id]);

  if (!forumPost) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{forumPost.title}</h2>
      <p className="text-gray-700">{forumPost.content}</p>
      {user && (
        <Link
          to={`/forum/edit/${forumPost.id}`}
          className="mt-5 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Edit Forum Post
        </Link>
      )}
    </div>
  );
}

export default ForumPostDetails;