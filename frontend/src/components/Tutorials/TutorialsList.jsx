import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tutorialService from '../services/tutorialService';
import authService from '../services/authService';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Tutorials</h2>
      <ul>
        {tutorials.map((tutorial) => (
          <li key={tutorial.id}>
            <Link to={`/tutorials/${tutorial.id}`}>{tutorial.title}</Link>
          </li>
        ))}
      </ul>
      {user && <Link to="/tutorials/create">Create Tutorial</Link>}
    </div>
  );
}

export default TutorialsList;