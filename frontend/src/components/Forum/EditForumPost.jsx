import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import forumService from '../services/forumService';

function EditForumPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    forumService.getForumPostById(id).then((response) => {
      setTitle(response.data.title);
      setContent(response.data.content);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    forumService
      .updateForumPost(id, { title, content })
      .then(() => {
        navigate(`/forum/${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Edit Forum Post</h2>
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

export default EditForumPost;