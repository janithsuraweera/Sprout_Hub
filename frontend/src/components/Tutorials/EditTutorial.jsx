import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tutorialService from '../services/tutorialService';

function EditTutorial() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    tutorialService.getTutorialById(id).then((response) => {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setVideoUrl(response.data.videoUrl);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    tutorialService
      .updateTutorial(id, { title, description, videoUrl })
      .then(() => {
        navigate(`/tutorials/${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Edit Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Video URL:</label>
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTutorial;