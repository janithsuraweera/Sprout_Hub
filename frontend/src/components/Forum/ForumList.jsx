import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  FireIcon
} from '@heroicons/react/24/outline';

const ForumList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [likeModalPost, setLikeModalPost] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

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
    setCurrentUser(user);
    fetchPosts();
  }, [selectedCategory, sortBy]);

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
      const response = await forumService.getAllForumPosts();
      let filteredPosts = response.data;
      
      // Filter by category if not 'all'
      if (selectedCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
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

  const handleLike = async (postId, liked) => {
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
      toast.error('Failed to update like status');
    }
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
            <span className="font-medium text-sm text-center">{category.name}</span>
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
                    <button
                      onClick={() => handleLike(post.id, post.likedUsers?.includes(currentUser?.id))}
                      className={`flex items-center gap-1 px-2 py-1 rounded ${post.likedUsers?.includes(currentUser?.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-red-200`}
                      disabled={!currentUser}
                      title={!currentUser ? 'Please login to like or unlike' : post.likedUsers?.includes(currentUser?.id) ? 'Unlike' : 'Like'}
                    >
                      <HeartIcon className={`h-5 w-5 ${post.likedUsers?.includes(currentUser?.id) ? 'text-red-600' : 'text-gray-600'}`} />
                      {post.likedUsers?.includes(currentUser?.id) ? 'Unlike' : 'Like'} {post.likes || 0}
                    </button>
                    {post.likedUsers && post.likedUsers.length > 0 && (
                      <button
                        className="text-xs text-blue-600 underline ml-2"
                        onClick={() => setLikeModalPost(post)}
                      >
                        View Likes
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5" />
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {post.authorUsername ? post.authorUsername : 'Anonymous User'}
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

      {likeModalPost && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Users who liked this post</h3>
            <ul className="mb-4 max-h-40 overflow-y-auto">
              {usersLoading ? (
                <li className="text-gray-500">Loading...</li>
              ) : likeModalPost.likedUsers && likeModalPost.likedUsers.length > 0 ? (
                likeModalPost.likedUsers.map((userId) => {
                  const user = allUsers.find(u => u.id === userId);
                  return (
                    <li key={userId} className="py-1 border-b text-gray-700">
                      {user ? (
                        <a href={`/profile/${user.username}`} className="text-blue-600 hover:underline">{user.username}</a>
                      ) : (
                        <span className="text-gray-400">Unknown User</span>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-500">No likes yet</li>
              )}
            </ul>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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