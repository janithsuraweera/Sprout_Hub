// import React, { useState } from 'react';
// // import { register } from './authService';
// // import { register } from '../../authService';
// import { register } from '../../services/authService';



// const RegisterForm = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('USER');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await register(username, password, role);
//             setMessage('Registration successful!');
//         } catch (error) {
//             setMessage(error.response.data);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="USER">User</option>
//                 <option value="ADMIN">Admin</option>
//             </select>
//             <button type="submit">Register</button>
//             {message && <p>{message}</p>}
//         </form>
//     );
// };

// export default RegisterForm;