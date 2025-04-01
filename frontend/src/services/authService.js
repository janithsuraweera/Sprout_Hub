// // import axios from 'axios';

// const API_URL = '/api/auth';

// export const register = async (username, password, role) => {
//     const response = await axios.post(`${API_URL}/register`, {
//         username,
//         password,
//         role,
//     });
//     return response.data;
// };

// export const login = async (username, password) => {
//     const response = await axios.post(`${API_URL}/login`, {
//         username,
//         password,
//     });
//     if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('role', response.data.role);
//     }
//     return response.data;
// };

// export const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
// };

// export const getCurrentUser = () => {
//     return localStorage.getItem('token');
// };