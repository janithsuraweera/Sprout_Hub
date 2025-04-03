import React from 'react';
import authService from '../../services/authService';
function Profile() {
  const user = authService.getCurrentUser();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

    </div>
  );
}

export default Profile;