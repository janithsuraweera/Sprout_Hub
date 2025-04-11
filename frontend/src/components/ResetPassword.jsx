import React, { useState } from 'react';
import authService from '../services/authService';
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.resetPassword(token, password).then((response) => {
            setMessage(response.data);
        }).catch((error) => {
            setMessage(error.response.data);
        });
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;