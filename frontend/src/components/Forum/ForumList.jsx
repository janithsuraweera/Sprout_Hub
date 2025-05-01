import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  ChatBubbleLeftRightIcon, 
  UserCircleIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import forumService from '../../services/forumService';
import authService from '../../services/authService';

function ForumList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await forumService.getAllForumPosts();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load forum posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forum Discussions</h1>
          <Link
            to="/forum/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Post
          </Link>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <Link
                    to={`/forum/${post.id}`}
                    className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {post.category}
                  </span>
                </div>

                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                  {post.content}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <UserCircleIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.comments?.length || 0} comments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No discussions yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new discussion.
            </p>
            <div className="mt-6">
              <Link
                to="/forum/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                New Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumList;