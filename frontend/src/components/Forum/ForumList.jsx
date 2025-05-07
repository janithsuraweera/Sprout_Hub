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
  UserCircleIcon
} from '@heroicons/react/24/outline';

const ForumList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    fetchPosts();
  }, []);

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forum</h1>
        {currentUser && (
          <Link
            to="/forum/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            New Post
          </Link>
        )}
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by {post.author?.username || 'Unknown User'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-5 w-5" />
                <span className="text-sm">{formatDate(post.createdAt)}</span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {post.content}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-500">{post.commentCount || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <HeartIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-500">{post.likeCount || 0}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  to={`/forum/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
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
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No posts yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumList;