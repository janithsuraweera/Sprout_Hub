import React, { useState } from 'react';
import authService from '../../services/authService';


const RegisterForm = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null); //new state for user role

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(username, password);
      onRegisterSuccess(response); //main component request to pass the user data.
      setUserRole(response.role); //new state for user role  (role eka defalt dala tiyennema user kenek widiyata)
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;