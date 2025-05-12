import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import forumService from '../../services/forumService';

const CreateForumPost = ({ darkMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'General Discussion',
    'Plant Care',
    'Garden Design',
    'Pest Control',
    'Harvesting',
    'Tools & Equipment',
    'Organic Gardening',
    'Indoor Plants',
    'Outdoor Plants',
    'Seasonal Gardening'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    } else if (formData.content.length > 5000) {
      newErrors.content = 'Content must be less than 5000 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    try {
      await forumService.createForumPost(formData);
      toast.success('Post created successfully! 🎉');
      navigate('/forum');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || 'Error creating post');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${darkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-gray-100'} py-12 transition-colors duration-200`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden transition-colors duration-200`}>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/forum')}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                >
                  <ArrowLeftIcon className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create New Post
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <SparklesIcon className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.title 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'
                    }`}
                    placeholder="Enter your post title"
                  />
                  {formData.title && (
                    <div className="absolute right-3 top-3">
                      {errors.title ? (
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-red-500">{errors.title}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formData.title.length}/100 characters
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.category 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="absolute right-3 top-3">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-red-500">{errors.category}</p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Content
                </label>
                <div className="relative">
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="8"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.content 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'
                    }`}
                    placeholder="Write your post content here..."
                  />
                  {formData.content && (
                    <div className="absolute right-3 top-3">
                      {errors.content ? (
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-red-500">{errors.content}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formData.content.length}/5000 characters
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/forum')}
                  className={`px-6 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading || isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    'Create Post'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForumPost;