import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import forumService from '../../services/forumService';
import authService from '../../services/authService';
import userService from '../../services/userService';
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
  FireIcon,
  Squares2X2Icon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const ForumList = ({ darkMode }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [likeModalPost, setLikeModalPost] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userFilter, setUserFilter] = useState('all'); // 'all' or 'my'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Topics', icon: '🌱' },
    { id: 'General Discussion', name: 'General Discussion', icon: '💬' },
    { id: 'Plant Care', name: 'Plant Care', icon: '🌿' },
    { id: 'Garden Design', name: 'Garden Design', icon: '🎨' },
    { id: 'Pest Control', name: 'Pest Control', icon: '🐛' },
    { id: 'Harvesting', name: 'Harvesting', icon: '🌾' },
    { id: 'Tools & Equipment', name: 'Tools & Equipment', icon: '🛠️' },
    { id: 'Organic Gardening', name: 'Organic Gardening', icon: '🌱' },
    { id: 'Indoor Plants', name: 'Indoor Plants', icon: '🏠' },
    { id: 'Outdoor Plants', name: 'Outdoor Plants', icon: '🌳' },
    { id: 'Seasonal Gardening', name: 'Seasonal Gardening', icon: '🌤️' }
  ];

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      toast.error('Please login to view forum posts');
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    fetchPosts();
  }, [selectedCategory, sortBy, navigate]);

  useEffect(() => {
    if (likeModalPost && allUsers.length === 0) {
      setUsersLoading(true);
      userService.getAllUsers().then(res => {
        setAllUsers(res.data);
      }).finally(() => setUsersLoading(false));
    }
  }, [likeModalPost]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await forumService.getAllForumPosts();
      let filteredPosts = response.data;
      
      // Filter by user if 'my' is selected
      if (userFilter === 'my' && currentUser) {
        filteredPosts = filteredPosts.filter(post => post.authorUsername === currentUser.username);
      }
      
      // Filter by category if not 'all'
      if (selectedCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
      }

      // Filter by search query if exists
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(query) || 
          post.content.toLowerCase().includes(query)
        );
      }
      
      // Sort posts
      switch (sortBy) {
        case 'recent':
          filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'popular':
          filteredPosts.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
          break;
        case 'comments':
          filteredPosts.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));
          break;
        default:
          break;
      }
      
      setPosts(filteredPosts);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to view forum posts');
        navigate('/login');
      } else {
        toast.error('Error fetching posts');
      }
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to refetch posts when userFilter changes
  useEffect(() => {
    fetchPosts();
  }, [userFilter, selectedCategory, sortBy, searchQuery]);

  const handleDelete = async (id) => {
    // Check if user is logged in
    if (!currentUser) {
      toast.error('Please login to delete posts');
      navigate('/login');
      return;
    }

    // Check if user is the post owner
    const post = posts.find(p => p.id === id);
    if (!post || post.authorUsername !== currentUser.username) {
      toast.error('You can only delete your own posts');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await forumService.deleteForumPost(id);
        toast.success('Post deleted successfully');
        fetchPosts();
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Please login to delete posts');
          navigate('/login');
        } else if (error.response?.status === 403) {
          toast.error('You can only delete your own posts');
        } else {
          toast.error('Error deleting post');
        }
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

  const handleLike = async (postId, liked) => {
    if (!currentUser) {
      toast.error('Please login to like posts');
      navigate('/login');
      return;
    }

    try {
      let updatedPost;
      if (liked) {
        const response = await forumService.unlikePost(postId);
        updatedPost = response.data;
      } else {
        const response = await forumService.likePost(postId);
        updatedPost = response.data;
      }
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === postId ? { ...p, likes: updatedPost.likes, likedUsers: updatedPost.likedUsers } : p))
      );
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to like posts');
        navigate('/login');
      } else {
        toast.error('Failed to update like status');
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-[60vh] ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 mb-8 transform transition-all duration-300 hover:shadow-xl`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Community Forum
            </h1>
            <p className="text-gray-600 text-lg">Join the discussion and share your knowledge with fellow farmers</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search topics..."
                className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-72 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-3.5 group-hover:text-green-500 transition-colors duration-300" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full border transition-colors duration-200 ${viewMode === 'grid' ? 'bg-green-500 text-white border-green-500' : 'bg-transparent text-gray-400 border-gray-300 hover:bg-gray-100'} ${darkMode ? 'hover:bg-gray-700' : ''}`}
                title="Grid View"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full border transition-colors duration-200 ${viewMode === 'list' ? 'bg-green-500 text-white border-green-500' : 'bg-transparent text-gray-400 border-gray-300 hover:bg-gray-100'} ${darkMode ? 'hover:bg-gray-700' : ''}`}
                title="List View"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            </div>
            {currentUser && (
              <Link
                to="/forum/create"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <PlusIcon className="h-6 w-6" />
                New Topic
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* User Filter Section */}
      {currentUser && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setUserFilter('all')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                userFilter === 'all'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setUserFilter('my')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                userFilter === 'my'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Topics
            </button>
          </div>
        </div>
      )}

      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-3 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                : 'bg-white hover:shadow-lg'
            }`}
          >
            <span className="text-3xl">{category.icon}</span>
            <span className="font-medium text-sm text-center">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Sort and Filter Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8 flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="comments">Most Comments</option>
          </select>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          {posts.length} topics found
        </div>
      </div>

      {/* Posts List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${viewMode === 'list' ? 'w-full' : ''}`}
          >
            <div className="p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {post.isPinned && (
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                        📌 Pinned
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                      {post.category || 'General'}
                    </span>
                  </div>
                  <Link
                    to={`/forum/${post.id}`}
                    className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white hover:text-green-300' : 'text-gray-800 hover:text-green-600'}`}
                  >
                    {post.title}
                  </Link>
                  <p className={`mt-3 line-clamp-2 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      {post.commentCount}
                    </span>
                    <button
                      onClick={() => handleLike(post.id, post.likedUsers?.includes(currentUser?.id))}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 ${
                        post.likedUsers?.includes(currentUser?.id)
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      disabled={!currentUser}
                    >
                      <HeartIcon className={`h-5 w-5 ${
                        post.likedUsers?.includes(currentUser?.id) ? 'text-red-600' : 'text-gray-600'
                      }`} />
                      {post.likes || 0}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5" />
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {post.authorUsername ? post.authorUsername : 'Anonymous User'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <Link
                  to={`/forum/${post.id}`}
                  className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors duration-300"
                >
                  Read More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                {currentUser && currentUser.username === post.authorUsername && (
                  <>
                    <Link
                      to={`/forum/edit/${post.id}`}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-gray-500 hover:text-red-700 transition-colors duration-300"
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
          <div className={`text-center py-16 rounded-2xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-7xl mb-6 animate-bounce">🌱</div>
            <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No Topics Found</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-6`}>Be the first to start a discussion in this category!</p>
            {currentUser && (
              <Link
                to="/forum/create"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Create New Topic
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Like Modal */}
      {likeModalPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 w-96 transform transition-all duration-300`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Users who liked this post</h3>
            <ul className="mb-6 max-h-60 overflow-y-auto">
              {usersLoading ? (
                <li className="text-gray-500 text-center py-4">Loading...</li>
              ) : likeModalPost.likedUsers && likeModalPost.likedUsers.length > 0 ? (
                likeModalPost.likedUsers.map((userId) => {
                  const user = allUsers.find(u => u.id === userId);
                  return (
                    <li key={userId} className="py-3 border-b border-gray-100 last:border-0">
                      {user ? (
                        <a 
                          href={`/profile/${user.username}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-2"
                        >
                          <UserCircleIcon className="h-6 w-6" />
                          {user.username}
                        </a>
                      ) : (
                        <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                          <UserCircleIcon className="h-6 w-6" />
                          Unknown User
                        </span>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-500 text-center py-4">No likes yet</li>
              )}
            </ul>
            <button
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-300"
              onClick={() => setLikeModalPost(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumList;