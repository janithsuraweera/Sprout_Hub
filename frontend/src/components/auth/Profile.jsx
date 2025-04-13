import React from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiLock, FiKey, FiUser, FiInfo } from 'react-icons/fi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Profile() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  if (user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>

          <Tabs>
            <TabList className="flex border-b">
              <Tab className="flex items-center p-2 cursor-pointer border-r">
                <FiUser className="mr-2" />
                User Info
              </Tab>
              <Tab className="flex items-center p-2 cursor-pointer">
                <FiInfo className="mr-2" />
                Other Info
              </Tab>
            </TabList>

            <TabPanel>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="text-lg font-medium">
                  <span className="font-semibold text-blue-600">Username:</span> {user.username}
                </p>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="text-lg font-medium">
                  <span className="font-semibold text-green-600">Role:</span> {user.role}
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleResetPassword}
                  className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
                >
                  <FiLock className="mr-2" />
                  Reset Password
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full"
                >
                  <FiKey className="mr-2" />
                  Forgot Password
                </button>
              </div>
            </TabPanel>
          </Tabs>

          <div className="text-center mt-6">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Profile;