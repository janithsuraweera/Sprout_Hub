import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    // Redirect admin users to admin dashboard
    if (user?.role === 'ROLE_ADMIN' && window.location.pathname === '/') {
      navigate('/admin-dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Sprout Hub
              </Link>
            </div>
            {user && user.role !== 'ROLE_ADMIN' && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/posts"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-blue-500 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Posts
                </Link>
                <Link
                  to="/tutorials"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-blue-500 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <BookOpenIcon className="h-5 w-5 mr-1" />
                  Tutorials
                </Link>
                <Link
                  to="/forum"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-blue-500 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
                  Forum
                </Link>
                <Link
                  to="/marketplace"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-blue-500 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-1" />
                  Marketplace
                </Link>
              </div>
            )}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group relative mr-4"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500 transform transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 transform transition-transform duration-300 group-hover:rotate-45" />
              )}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </span>
            </button>

            {user ? (
              <div className="ml-3 relative" ref={profileRef}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium text-sm hover:bg-blue-700 transition-colors duration-200">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Profile
                          </Link>
                          {user?.role === 'ROLE_ADMIN' && (
                            <Link
                              to="/admin-dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              role="menuitem"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              handleLogout();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        {user && user.role !== 'ROLE_ADMIN' && (
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/posts"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500"
            >
              <HomeIcon className="h-5 w-5 inline-block mr-2" />
              Posts
            </Link>
            <Link
              to="/tutorials"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500"
            >
              <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
              Tutorials
            </Link>
            <Link
              to="/forum"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 inline-block mr-2" />
              Forum
            </Link>
            <Link
              to="/marketplace"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500"
            >
              <ShoppingCartIcon className="h-5 w-5 inline-block mr-2" />
              Marketplace
            </Link>
          </div>
        )}
        {user ? (
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="mt-3 space-y-1">
              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <>
                    <SunIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    Switch to Light Mode
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                    Switch to Dark Mode
                  </>
                )}
              </button>
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium text-sm">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="ml-2">Profile</span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="group relative block w-full text-left px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="absolute inset-0 w-0 bg-gray-200 dark:bg-gray-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center">
                  <ArrowRightOnRectangleIcon className="h-5 w-5 inline-block mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  Logout
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="mt-3 space-y-1">
              {/* Dark Mode Toggle for Mobile (Non-logged in) */}
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <>
                    <SunIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    Switch to Light Mode
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                    Switch to Dark Mode
                  </>
                )}
              </button>
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

