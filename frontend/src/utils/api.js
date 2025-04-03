import axios from 'axios';
import authHeader from '../services/authHeader';

const API_BASE_URL = 'http://localhost:8082/api'; // Replace with API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const headers = authHeader();
    if (headers.Authorization) {
      config.headers.Authorization = headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
//    console.log(error);
    if (error.response && error.response.status === 401) {
    

      console.error('Unauthorized access:', error);
      authService.logout(); 
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;