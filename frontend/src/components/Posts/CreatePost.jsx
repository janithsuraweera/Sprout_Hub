import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../../services/postService';
//post creation
function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    postService
      .createPost({ title, content })
      .then(() => {
        navigate('/posts');
      })
      .catch((err) => {
        console.error(err);
        // error handling 
      });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;