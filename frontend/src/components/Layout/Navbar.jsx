import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Posts</Link></li>
        <li><Link to="/tutorials">Tutorials</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/admin/users">User Management</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;