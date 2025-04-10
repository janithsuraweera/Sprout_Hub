import api from '../utils/api';
import authHeader from './authHeader';

const getAllUsers = () => {
  return api.get('/users', { headers: authHeader() });
};

const userService = {
  getAllUsers,
};

export default userService;