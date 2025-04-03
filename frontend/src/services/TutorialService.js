import api from '../utils/api';

const getAllTutorials = () => {
  return api.get('/tutorials');
};

const getTutorialById = (id) => {
  return api.get(`/tutorials/${id}`);
};

const createTutorial = (data) => {
  return api.post('/tutorials', data);
};

const updateTutorial = (id, data) => {
  return api.put(`/tutorials/${id}`, data);
};

const deleteTutorial = (id) => {
  return api.delete(`/tutorials/${id}`);
};

const tutorialService = {
  getAllTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial,
};

export default tutorialService;