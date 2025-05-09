import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  PhotoIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  BellIcon,
  KeyIcon,
  GlobeAltIcon,
  ShieldExclamationIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showActivity: true
  });
  const [activity, setActivity] = useState([
    {
      id: 1,
      type: 'post',
      title: 'How to grow tomatoes',
      date: '2024-03-15T10:30:00',
      icon: DocumentTextIcon
    },
    {
      id: 2,
      type: 'comment',
      title: 'Commented on "Best fertilizers for plants"',
      date: '2024-03-14T15:45:00',
      icon: ChatBubbleLeftRightIcon
    },
    {
      id: 3,
      type: 'tutorial',
      title: 'Published tutorial: "Organic Gardening Basics"',
      date: '2024-03-13T09:15:00',
      icon: BookOpenIcon
    }
  ]);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }

        if (username) {
          // Fetch other user's profile
          const response = await userService.getUserByUsername(username);
          setUser(response.data);
          setEditedUser(response.data);
          setIsOwnProfile(currentUser.username === username);
        } else {
          // Show current user's profile
          setUser(currentUser);
          setEditedUser(currentUser);
          setIsOwnProfile(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate, username]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the user
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Here you would typically make an API call to delete the user
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the password
    alert('Password updated successfully!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative group">
            <div className="bg-white p-2 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-105">
              <UserCircleIcon className="h-32 w-32 text-blue-500" />
              {isOwnProfile && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer transform transition-all duration-300 hover:bg-blue-600">
                  <PhotoIcon className="h-6 w-6" />
                </div>
              )}
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            {isEditing && isOwnProfile ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300"
                    placeholder="Enter email"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-6 py-3 border-2 border-red-500 text-white rounded-lg hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
                  >
                    <XMarkIcon className="h-5 w-5 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-white mb-4">{user.username}</h1>
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start">
                    <EnvelopeIcon className="h-5 w-5 text-white/80 mr-2" />
                    <span className="text-white/80">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <CalendarIcon className="h-5 w-5 text-white/80 mr-2" />
                    <span className="text-white/80">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  {user.role === 'ROLE_ADMIN' && (
                    <div className="flex items-center justify-center md:justify-start">
                      <ShieldCheckIcon className="h-5 w-5 text-white/80 mr-2" />
                      <span className="text-white/80">Administrator</span>
                    </div>
                  )}
                </div>
                {isOwnProfile && (
                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <PencilSquareIcon className="h-5 w-5 mr-2" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="inline-flex items-center px-6 py-3 border-2 border-red-500 text-white rounded-lg hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
                    >
                      <TrashIcon className="h-5 w-5 mr-2" />
                      Delete Account
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
              activeTab === 'activity'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
              activeTab === 'settings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {activeTab === 'overview' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Profile Overview</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">Total Posts</h3>
                <p className="text-4xl font-bold text-blue-600 text-center mt-2">{user.posts?.length || 0}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">Comments</h3>
                <p className="text-4xl font-bold text-green-600 text-center mt-2">{user.comments?.length || 0}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <BookOpenIcon className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">Tutorials</h3>
                <p className="text-4xl font-bold text-purple-600 text-center mt-2">{user.tutorials?.length || 0}</p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
                <p className="text-gray-600">No bio added yet.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {activity.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No recent activity to show
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              
              {/* Password Settings */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <KeyIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Change Password
                </h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Notification Settings */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <BellIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('email')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        notifications.email ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          notifications.email ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Receive push notifications</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('push')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        notifications.push ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          notifications.push ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Marketing Emails</h4>
                      <p className="text-sm text-gray-500">Receive marketing updates</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('marketing')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        notifications.marketing ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ShieldExclamationIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Privacy Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Show Email Address</h4>
                      <p className="text-sm text-gray-500">Display your email on your profile</p>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        privacy.showEmail ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Show Activity</h4>
                      <p className="text-sm text-gray-500">Display your activity on your profile</p>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange('showActivity', !privacy.showActivity)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        privacy.showActivity ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          privacy.showActivity ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-gray-500">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile; 