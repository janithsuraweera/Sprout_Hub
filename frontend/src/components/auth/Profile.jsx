import React from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };


  const handleResetPassword = () => {
    navigate('/reset-password'); // Reset Password page එකට navigate කරන්න
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Forgot Password page එකට navigate කරන්න
  };

if(user){
  return (
  
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
        <p className="text-lg font-medium">Username: {user.username}</p>
        {/* <p className="text-lg font-medium">Email: {user.email}</p> */}
        <p className="text-lg font-medium">Role: {user.role}</p>
        <div className="text-center mt-6">
          
          
          <button
           onClick={handleLogout}
            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

          <button // Added button for Reset Password
              onClick={handleResetPassword}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-2" // Added mb-2
            >
              Reset Password
            </button>
            <button // Added button for Forgot Password
              onClick={handleForgotPassword}
              className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Forgot Password
            </button>


          
        </div>
      </div>
    </div>
  );
  }else{
    return null;
    }
      
}


export default Profile;
