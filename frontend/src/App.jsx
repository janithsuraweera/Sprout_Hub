import React, { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import authService from './services/authService';

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [showLogin, setShowLogin] = useState(true); // login form first open

  const handleLoginSuccess = (userData) => { // login success
    setUser(userData);
    setShowLogin(false); 
    
  };

  const handleRegisterSuccess = (userData) => { // register success
    setUser(userData);
    setShowLogin(false); 
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setShowLogin(true); // logout and enter loging form
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.role}!</p>
          <button onClick={handleLogout}>Logout</button>



          {/*other option in my parts */}
        </div>
      ) : (
        <div>
          {showLogin ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          )}
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Go to Register' : 'Go to Login'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;