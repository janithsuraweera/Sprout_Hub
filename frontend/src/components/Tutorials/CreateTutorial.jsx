import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';   


function CreateTutorial() {  //keep track of what the user types into each field

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();  //refreshing when the form is submitted
    tutorialService
      .createTutorial({ title, description, videoUrl })  //Sends the form data to the backend
      .then(() => {
        navigate('/tutorials');
      })
      .catch((err) => {
        console.error(err);
      });
  };

