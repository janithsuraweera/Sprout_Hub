import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Sprout Hub</span>. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="#privacy" className="text-gray-400 hover:text-gray-200 mx-2">Privacy Policy</a>
          <a href="#terms" className="text-gray-400 hover:text-gray-200 mx-2">Terms of Service</a>
          <a href="#contact" className="text-gray-400 hover:text-gray-200 mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
