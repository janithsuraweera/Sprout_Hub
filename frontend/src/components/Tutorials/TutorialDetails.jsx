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

  