import axios from 'axios';
import authHeader from '../services/authHeader';

const API_BASE_URL = 'http://localhost:8082/api'; // ඔබේ බැක්එන්ඩ් API ලිපිනය

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ඉල්ලීම් වලට පෙර ටෝකනය (token) එකතු කරන්න (අවශ්‍ය නම්)
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

// ප්‍රතිචාර (response) වල දෝෂ (errors) හසුරුවන්න
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // සත්‍යාපන දෝෂ (authentication errors) හසුරුවන්න
    if (error.response && error.response.status === 401) {
      // මෙහිදී, ඔබගේ යෙදුමේ අවශ්‍යතාවයන්ට අනුව සත්‍යාපන දෝෂ (authentication errors) හසුරුවන්න.
      // උදාහරණයක් ලෙස, පරිශීලකයා ලොග් අවුට් (log out) කිරීම හෝ නැවත ලොග් වීමට යොමු කිරීම.
      console.error('Unauthorized access:', error);
      //authService.logout(); // අවශ්‍ය නම් ලොග් අවුට් කරන්න
      //window.location.href = '/login'; // නැවත ලොග් වීමට යොමු කරන්න
    }
    return Promise.reject(error);
  }
);

export default api;