import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import forumService from '../../services/forumService';
import authService from '../../services/authService';

function ForumPostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await forumService.getForumPostById(id);
        setPost(response.data);
      } catch (err) {
        setError('Failed to load forum post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await forumService.deleteForumPost(id);
        navigate('/forum');
      } catch (err) {
        setError('Failed to delete forum post');
      }
    }
  };

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

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              {user && user.id === post.userId && (
                <div className="flex space-x-2">
                  <Link
                    to={`/forum/edit/${post.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">{post.author}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
            </div>

            <div className="mt-8">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-1" />
                <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
              </div>
              {post.comments && post.comments.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                      </div>
                      <p className="mt-2 text-gray-600">{comment.content}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-500">No comments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPostDetails;