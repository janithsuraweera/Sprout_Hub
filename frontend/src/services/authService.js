import axios from 'axios';

const API_URL = 'http://localhost:8082/api/auth/';

const login = async (usernameOrEmail, password) => {
  const response = await axios.post(API_URL + 'login', {
    usernameOrEmail,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (username, email, password) => {
  const response = await axios.post(API_URL + 'register', {
    username,
    email,
    password,
    role: 'ROLE_USER'
  });
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default authService;

