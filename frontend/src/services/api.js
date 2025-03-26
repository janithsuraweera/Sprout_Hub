import axios from 'axios';

const API_URL = 'http://localhost:8081/api/users'; // Backend URL

export const registerUser = (username, password, email, role) => {
  return axios.post(`${API_URL}/register`, {
    username,
    password,
    email,
    role,
  });
};

export const loginUser = (username, password) => {
  return axios.post(`${API_URL}/login`, {
    username,
    password,
  });
};