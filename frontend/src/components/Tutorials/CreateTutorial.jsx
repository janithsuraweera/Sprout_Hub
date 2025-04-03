import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';

function CreateTutorial() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    tutorialService
      .createTutorial({ title, description, videoUrl })
      .then(() => {
        navigate('/tutorials');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Create Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Video URL:</label>
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTutorial;