import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserCircleIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import authService from '../../services/authService';

const RegisterForm = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await authService.register(formData.username, formData.email, formData.password);
      if (response.token) {
        navigate('/home');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-md w-full space-y-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-2xl shadow-2xl transition-colors duration-300`}>
        <div>
          <h2 className={`mt-2 text-center text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Create Your Account
          </h2>
          <p className={`mt-2 text-center text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join our community today
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircleIcon className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className={`appearance-none rounded-lg block w-full px-3 py-3 pl-10 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`}
                placeholder="Choose a username"
                aria-label="Username"
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-lg block w-full px-3 py-3 pl-10 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`}
                placeholder="Enter your email"
                aria-label="Email"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-lg block w-full px-3 py-3 pl-10 pr-10 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`}
                placeholder="Create a password"
                aria-label="Password"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'} focus:outline-none`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </span>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none rounded-lg block w-full px-3 py-3 pl-10 pr-10 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`}
                placeholder="Confirm your password"
                aria-label="Confirm Password"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'} focus:outline-none`}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </span>
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
              aria-label="Sign up"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign up
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </div>
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;