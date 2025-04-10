import React from 'react';
import authService from '../../services/authService';

function Profile() {
  const user = authService.getCurrentUser();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
        <p className="text-lg font-medium">Username: {user.username}</p>
        <p className="text-lg font-medium">Email: {user.email}</p>
        <p className="text-lg font-medium">Role: {user.role}</p>
        <div className="text-center mt-6">
          <button
            onClick={() => authService.logout()}
            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
