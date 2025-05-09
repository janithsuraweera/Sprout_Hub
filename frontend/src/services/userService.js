import api from '../utils/api';
import authHeader from './authHeader';

const getAllUsers = () => {
  return api.get('/users', { headers: authHeader() });
};

const getUserByUsername = (username) => {
  return api.get(`/users/${username}`, { headers: authHeader() });
};

const userService = {
  getAllUsers,
  getUserByUsername,
};

export default userService;