// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/tutorials">Tutorials</Link></li>
//         <li><Link to="/forum">Forum</Link></li>
//         <li><Link to="/marketplace">Marketplace</Link></li>
//         <li><Link to="/login">Login</Link></li>
//         <li><Link to="/register">Register</Link></li>
//         <li><Link to="/profile">Profile</Link></li>
//         <li><Link to="/admin/users">User Management</Link></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
            <Link to="/post" className="hover:text-gray-200 transition duration-300">
              Post
            </Link>
          </li>
        </ul>

        {/* Login and Register on the opposite side */}
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-blue-600 transition duration-300">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-blue-600 transition duration-300">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
