import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';
import authService from '../../services/authService';

function CreateTutorial() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const MAX_FILE_SIZE_MB = 50;
  const MAX_LINK_LENGTH = 300;

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
    if (e.target.value) setVideoFile(null);
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    if (e.target.files[0]) setVideoUrl('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!title || !description) {
      setError('Title and Description are required!');
      return;
    }
    if (!videoUrl && !videoFile) {
      setError('Please provide a video link or upload a video file.');
      return;
    }
    if (videoUrl && videoFile) {
      setError('Please use only one method: either provide a link or upload a file.');
      return;
    }
    if (videoUrl) {
      if (videoUrl.length > MAX_LINK_LENGTH) {
        setError('Video link is too long (max 300 characters).');
        return;
      }
    }
    if (videoFile) {
      if (videoFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError('Video file size must be 50MB or less.');
        return;
      }
    }

    const user = authService.getCurrentUser();
    const author = user ? user.username : 'Unknown Author';

    let formData;
    if (videoFile) {
      formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('author', author);
      formData.append('videoFile', videoFile);
    } else {
      formData = { title, description, author, videoUrl };
    }

    const createPromise =
      videoFile
        ? tutorialService.createTutorial(formData)
        : tutorialService.createTutorial(formData);

    createPromise
      .then(() => navigate('/tutorials'))
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Network Error: Unable to connect to the server!');
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Tutorial</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Link or Upload File <span className="text-xs text-gray-500">(Only one method allowed)</span>
            </label>
            <input
              type="text"
              placeholder="Paste YouTube/Vimeo link here"
              value={videoUrl}
              onChange={handleUrlChange}
              className="mt-1 p-2 border rounded w-full"
              disabled={!!videoFile}
              maxLength={MAX_LINK_LENGTH}
            />
            <div className="flex items-center mt-2">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="mr-2"
                disabled={!!videoUrl}
              />
              <span className="text-xs text-gray-500">Short video only (max 50MB)</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTutorial;