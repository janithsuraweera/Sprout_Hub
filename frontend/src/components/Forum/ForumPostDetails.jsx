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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{forumPost.title}</h2>
      <p>{forumPost.content}</p>
      {user && <Link to={`/forum/edit/${forumPost.id}`}>Edit Forum Post</Link>}
    </div>
  );
}

export default ForumPostDetails;