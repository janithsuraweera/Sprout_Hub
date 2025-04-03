import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import forumService from '../services/forumService';

function CreateForumPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    forumService
      .createForumPost({ title, content })
      .then(() => {
        navigate('/forum');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Create Forum Post</h2>
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

export default CreateForumPost;