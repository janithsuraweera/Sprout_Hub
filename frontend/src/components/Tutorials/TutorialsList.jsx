import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';
import authService from '../../services/authService';
import TutorialCard from './TutorialCard';

function TutorialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = authService.getCurrentUser();

  const fetchTutorials = async () => {
    try {
      const response = await tutorialService.getAllTutorials();
      setTutorials(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const handleDelete = (tutorialId) => {
    setTutorials(tutorials.filter(tutorial => tutorial.id !== tutorialId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Tutorials</h2>
        {user && (
          <Link
            to="/tutorials/create"
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">+</span> Create Tutorial
          </Link>
        )}
      </div>

      {tutorials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tutorials available yet.</p>
          {user && (
            <Link
              to="/tutorials/create"
              className="inline-block mt-4 text-blue-500 hover:text-blue-600"
            >
              Be the first to create one!
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TutorialsList;