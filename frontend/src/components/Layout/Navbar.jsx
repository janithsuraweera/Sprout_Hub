import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService'; // authService එක import කරන්න

function Navbar() {
  const user = authService.getCurrentUser(); // දැනට ලොග් වී සිටින පරිශීලකයා ලබාගන්න
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-xl font-semibold">
          <Link to="/home" className="text-white hover:text-gray-200">
            Sprout Hub
          </Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/home" className="hover:text-gray-200 transition duration-300">
              Home
            </Link>
          </li>

          {user && ( // පරිශීලකයා ලොග් වී ඇත්නම් පමණක් පහත පිටු පෙන්වන්න
            <>
              <li>
                <Link to="/tutorials" className="hover:text-gray-200 transition duration-300">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/forum" className="hover:text-gray-200 transition duration-300">
                  Forum
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-gray-200 transition duration-300">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/posts" className="hover:text-gray-200 transition duration-300">
                  Posts
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Login and Register on the opposite side or Logout button if logged in */}

        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <Link to="/profile" className="hover:text-gray-200 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
              
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>

              <Link to="/login" className="px-4 py-2 bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-blue-600 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-blue-600 transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

