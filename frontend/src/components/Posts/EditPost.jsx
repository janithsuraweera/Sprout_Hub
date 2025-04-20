import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postService from '../../services/postService';
//post edit 
function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    postService.getPostById(id).then((response) => {
      setTitle(response.data.title);
      setContent(response.data.content);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postService
      .updatePost(id, { title, content })
      .then(() => {
        navigate(`/posts/${id}`);
      })
      .catch((err) => {
        console.error(err);
        // Error handling
      });
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPost;