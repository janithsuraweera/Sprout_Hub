import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import forumService from '../../services/forumService';
import authService from '../../services/authService';
import { 
  PencilIcon, 
  TrashIcon, 
  ChatBubbleLeftIcon,
  HeartIcon,
  ClockIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  BookmarkIcon,
  FireIcon
} from '@heroicons/react/24/outline';

const ForumList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '🌱' },
    { id: 'organic', name: 'Organic Farming', icon: '🌿' },
    { id: 'gardening', name: 'Gardening', icon: '🌺' },
    { id: 'technology', name: 'Agri Tech', icon: '💻' },
    { id: 'market', name: 'Market', icon: '💰' },
    { id: 'general', name: 'General', icon: '💬' }
  ];

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    fetchPosts();
  }, [selectedCategory, sortBy]);

  const fetchPosts = async () => {
    try {
      const response = await forumService.getAllForumPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await forumService.deleteForumPost(id);
        toast.success('Post deleted successfully');
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Error deleting post');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1 w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Forum</h1>
            <p className="text-gray-600">Join the discussion and share your knowledge with fellow farmers</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search topics..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
            {currentUser && (
              <Link
                to="/forum/create"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                New Topic
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-xl shadow-md transition-all duration-200 flex flex-col items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-green-500 text-white transform scale-105'
                : 'bg-white hover:shadow-lg'
            }`}
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="font-medium text-sm">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Sort and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="comments">Most Comments</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {posts.length} topics found
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.isPinned && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        📌 Pinned
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {post.category || 'General'}
                    </span>
                  </div>
                  <Link
                    to={`/forum/${post.id}`}
                    className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      {post.commentCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <HeartIcon className="h-5 w-5" />
                      {post.likeCount || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5" />
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {post.author?.username || 'Unknown User'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  to={`/forum/${post.id}`}
                  className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  Read More
                </Link>
                {currentUser && (currentUser.id === post.author?.id || currentUser.role === 'ADMIN') && (
                  <>
                    <Link
                      to={`/forum/edit/${post.id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-gray-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Topics Found</h3>
            <p className="text-gray-600 mb-4">Be the first to start a discussion in this category!</p>
            {currentUser && (
              <Link
                to="/forum/create"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Create New Topic
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumList;