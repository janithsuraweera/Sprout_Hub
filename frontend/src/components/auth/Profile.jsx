import React, { useState } from 'react';
import authService from '../../services/authService';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .forgetPassword(username)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '10px' }}>{message}</p>}
      <Link to="/" style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>Back to Profile</Link>
    </div>
  );
}

export default ForgotPassword;