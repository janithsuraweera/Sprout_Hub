import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  ShieldCheckIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-white p-2 rounded-full">
            <UserCircleIcon className="h-24 w-24 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{user.username}</h1>
            <div className="flex items-center mt-2">
              <EnvelopeIcon className="h-5 w-5 text-white mr-2" />
              <span className="text-white">{user.email}</span>
            </div>
            <div className="flex items-center mt-2">
              <CalendarIcon className="h-5 w-5 text-white mr-2" />
              <span className="text-white">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            {user.role === 'ROLE_ADMIN' && (
              <div className="flex items-center mt-2">
                <ShieldCheckIcon className="h-5 w-5 text-white mr-2" />
                <span className="text-white">Administrator</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Total Posts</h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">{user.posts?.length || 0}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">{user.comments?.length || 0}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Tutorials</h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">{user.tutorials?.length || 0}</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
            <p className="text-gray-600">No bio added yet.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 