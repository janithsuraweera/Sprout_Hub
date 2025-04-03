import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import postService from '../../services/postService';
import authService from '../../services/authService';

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const user = authService.getCurrentUser();

  useEffect(() => {
    postService.getPostById(id).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {user && <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>}
    </div>
  );
}

export default PostDetails;