import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import forumService from '../../services/forumService';
import authService from '../../services/authService';

const EditForumPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    authorUsername: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      toast.error('Please login to edit posts');
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      fetchPost();
    }
  }, [currentUser, id]);

  const fetchPost = async () => {
    try {
      const response = await forumService.getForumPostById(id);
      const post = response.data;
      
      // Check if user is the author
      if (post.authorUsername !== currentUser.username) {
        toast.error('You can only edit your own posts');
        navigate('/forum');
        return;
      }

      setFormData({
        title: post.title,
        content: post.content,
        category: post.category || '',
        authorUsername: post.authorUsername
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to edit posts');
        navigate('/login');
      } else if (error.response?.status === 403) {
        toast.error('You can only edit your own posts');
        navigate('/forum');
      } else {
        toast.error('Error fetching post');
        navigate('/forum');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return false;
    }

    if (!formData.content.trim()) {
      toast.error('Please enter content');
      return false;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }

    if (formData.title.length < 5) {
      toast.error('Title must be at least 5 characters long');
      return false;
    }

    if (formData.content.length < 20) {
      toast.error('Content must be at least 20 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      // Ensure authorUsername is included in the update
      const updateData = {
        ...formData,
        authorUsername: currentUser.username,
        authorId: currentUser.id,
        author: {
          id: currentUser.id,
          username: currentUser.username
        }
      };
      
      await forumService.updateForumPost(id, updateData);
      toast.success('Post updated successfully');
      navigate('/forum');
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to edit posts');
        navigate('/login');
      } else if (error.response?.status === 403) {
        toast.error('You can only edit your own posts');
        navigate('/forum');
      } else {
        toast.error(error.response?.data?.message || 'Error updating post');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your post title"
              required
              minLength={5}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your post content"
              required
              minLength={20}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/forum/${id}`)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 border border-transparent rounded-lg text-white ${
                saving ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForumPost;