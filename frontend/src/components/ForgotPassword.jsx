import React, { useState } from 'react';
import authService from '../services/authService';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.forgetPassword(username).then((response) => {
            setMessage(response.data);
        }).catch((error) => {
            setMessage(error.response.data);
        });
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;