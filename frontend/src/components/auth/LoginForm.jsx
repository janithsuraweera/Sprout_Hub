// import React, { useState } from 'react';
// // import { login } from './authService';
// // import { login } from '../../authService';
// import { login } from '../../services/authService';


// const LoginForm = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await login(username, password);
//             setMessage('Login successful!');
//             // Redirect to protected route or dashboard
//         } catch (error) {
//             setMessage(error.response.data);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit">Login</button>
//             {message && <p>{message}</p>}
//         </form>
//     );
// };

// export default LoginForm;