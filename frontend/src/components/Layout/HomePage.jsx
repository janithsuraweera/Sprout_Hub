import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';

function HomePage() {
  const user = authService.getCurrentUser();
  const [search, setSearch] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch users if the user is logged in
    if (user) {
      userService.getAllUsers()
        .then(res => {
          if (res.data) {
            setAllUsers(res.data);
          }
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          // The error will be handled by the API interceptor
          setAllUsers([]);
        });
    } else {
      setAllUsers([]);
    }
  }, [user]);

  // Live filter as user types
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
      {/* Search Bar for logged-in users */}
      {user && (
        <div className="max-w-2xl mx-auto pt-8 pb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search users by username or email..."
              value={search}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200"
              disabled
            >
              Search
            </button>
          </div>
          {/* Show user search results */}
          {userResults.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg mt-2 shadow">
              <ul>
                {userResults.map(u => (
                  <li
                    key={u.id}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
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
      {/* Hero Section */}
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
                  Your one-stop platform for learning, sharing, and growing together. Join our community of passionate individuals.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {!user ? (
                    <>
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
                    </>
                  ) : (
                    <div className="rounded-md shadow">
                      <Link
                        to="/posts"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Explore Posts
                      </Link>
                    </div>
                  )}
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

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to grow
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides all the tools you need to learn, share, and connect with others.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Posts Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Posts</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Share your thoughts and experiences with the community. Create, read, and interact with posts.
                  </p>
                </div>
              </div>

              {/* Tutorials Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Tutorials</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access comprehensive tutorials and guides to enhance your knowledge and skills.
                  </p>
                </div>
              </div>

              {/* Forum Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Forum</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Join discussions, ask questions, and share knowledge with our active community.
                  </p>
                </div>
              </div>

              {/* Marketplace Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Marketplace</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Buy and sell products in our secure and user-friendly marketplace.
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
              <span className="block">Ready to dive in?</span>
              <span className="block text-blue-200">Start your journey today.</span>
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

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                About
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                Privacy
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                Terms
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2024 Sprout Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage; 