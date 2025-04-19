import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';
import authService from '../../services/authService';

function TutorialDetails() {
  const [tutorial, setTutorial] = useState(null);
  const { id } = useParams();
  const user = authService.getCurrentUser();

  useEffect(() => {
    tutorialService.getTutorialById(id).then((response) => {
      setTutorial(response.data);
    });
  }, [id]);

  if (!tutorial) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{tutorial.title}</h2>
      <p className="text-gray-700 mb-2">{tutorial.description}</p>
      <p className="text-blue-600">Video URL: {tutorial.videoUrl}</p>
      {user && (
        <Link
          to={`/tutorials/edit/${tutorial.id}`}
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Edit Tutorial
        </Link>
      )}
    </div>
  );
}

export default TutorialDetails;