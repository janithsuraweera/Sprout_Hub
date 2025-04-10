import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Tutorial</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL:</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTutorial;