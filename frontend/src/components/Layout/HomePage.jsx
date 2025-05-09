import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import { 
  UserGroupIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  ShoppingBagIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon,
  ArrowTrendingUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

function HomePage() {
  const user = authService.getCurrentUser();
  const [search, setSearch] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activePosts: 0,
    tutorials: 0,
    marketplaceItems: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      userService.getAllUsers()
        .then(res => {
          if (res.data) {
            setAllUsers(res.data);
            setStats(prev => ({ ...prev, totalUsers: res.data.length }));
          }
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          setAllUsers([]);
        });
    } else {
      setAllUsers([]);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === '') {
      setUserResults([]);
      return;
    }
    const results = allUsers.filter(u => {
      const username = u?.username?.toLowerCase() || '';
      const email = u?.email?.toLowerCase() || '';
      const searchValue = value.toLowerCase();
      return username.includes(searchValue) || email.includes(searchValue);
    });
    setUserResults(results);
  };

  const handleUserClick = (username) => {
    setSearch('');
    setUserResults([]);
    navigate(`/profile/${username}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Welcome Section for logged-in users */}
      {user && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">Welcome back, {user.username}! 👋</h1>
                <p className="text-blue-100 text-lg">Your gardening journey continues here.</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/posts/create"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Create Post
                </Link>
                <Link
                  to="/tutorials/create"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <BookOpenIcon className="h-5 w-5 mr-2" />
                  Write Tutorial
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar for logged-in users */}
      {user && (
        <div className="max-w-2xl mx-auto pt-8 pb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Search users by username or email..."
              value={search}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Search
            </button>
          </div>
          {userResults.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg mt-2 shadow-lg">
              <ul>
                {userResults.map(u => (
                  <li
                    key={u.id}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => handleUserClick(u.username)}
                  >
                    <span className="font-semibold text-blue-700">{u.username}</span>
                    <span className="ml-2 text-gray-500 text-sm">{u.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats Section */}
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <UserGroupIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Posts</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.activePosts}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <BookOpenIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tutorials</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.tutorials}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <ShoppingBagIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Marketplace Items</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.marketplaceItems}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Section */}
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/posts" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <DocumentTextIcon className="h-6 w-6" />
                  </div>
                  <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Browse Posts</h3>
                <p className="mt-2 text-sm text-gray-500">Explore community discussions and updates</p>
              </div>
            </Link>
            <Link to="/tutorials" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <BookOpenIcon className="h-6 w-6" />
                  </div>
                  <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Tutorials</h3>
                <p className="mt-2 text-sm text-gray-500">Learn from expert gardeners</p>
              </div>
            </Link>
            <Link to="/forum" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <ChatBubbleLeftRightIcon className="h-6 w-6" />
                  </div>
                  <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Forum</h3>
                <p className="mt-2 text-sm text-gray-500">Join gardening discussions</p>
              </div>
            </Link>
            <Link to="/marketplace" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors duration-300">
                    <ShoppingBagIcon className="h-6 w-6" />
                  </div>
                  <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 group-hover:text-yellow-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Marketplace</h3>
                <p className="mt-2 text-sm text-gray-500">Buy and sell gardening supplies</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section for non-logged in users */}
      {!user && (
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Welcome to</span>{' '}
                    <span className="block text-blue-600 xl:inline">Sprout Hub</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Your one-stop platform for learning, sharing, and growing together. Join our community of passionate gardeners.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
            />
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to grow
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides all the tools you need to learn, share, and connect with other gardeners.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Posts Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Posts</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Share your gardening experiences and tips with the community. Create, read, and interact with posts.
                  </p>
                </div>
              </div>

              {/* Tutorials Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BookOpenIcon className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Tutorials</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access comprehensive gardening tutorials and guides to enhance your knowledge and skills.
                  </p>
                </div>
              </div>

              {/* Forum Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <ChatBubbleLeftRightIcon className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Forum</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Join gardening discussions, ask questions, and share knowledge with our active community.
                  </p>
                </div>
              </div>

              {/* Marketplace Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <ShoppingBagIcon className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Marketplace</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Buy and sell gardening supplies, plants, and tools in our secure marketplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start your gardening journey?</span>
              <span className="block text-blue-200">Join our community today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Get started
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage; 