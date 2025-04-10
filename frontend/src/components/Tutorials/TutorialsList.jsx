import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';
import authService from '../../services/authService';

function TutorialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = authService.getCurrentUser();

  useEffect(() => {
    tutorialService
      .getAllTutorials()
      .then((response) => {
        setTutorials(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Tutorials</h2>
      <ul className="space-y-2">
        {tutorials.map((tutorial) => (
          <li key={tutorial.id} className="border rounded p-4 hover:bg-gray-100">
            <Link to={`/tutorials/${tutorial.id}`} className="text-blue-600 hover:underline">
              {tutorial.title}
            </Link>
          </li>
        ))}
      </ul>
      {user && (
        <Link
          to="/tutorials/create"
          className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create Tutorial
        </Link>
      )}
    </div>
  );
}

export default TutorialsList;