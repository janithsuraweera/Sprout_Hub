// import React, { useState } from 'react';
// import authService from '../../services/authService';

// const LoginForm = ({ onLoginSuccess }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await authService.login(username, password);
//       onLoginSuccess(response); //main component request to pass the user data.
//     } catch (err) {
//       setError(err.message || 'Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;




import React, { useState } from 'react';
import authService from '../../services/authService';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      onLoginSuccess(response.data); // Pass user data to the main component
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;