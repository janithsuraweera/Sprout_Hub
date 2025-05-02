import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon,
  TrashIcon,
  HeartIcon,
  UserGroupIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import forumService from '../../services/forumService';
import authService from '../../services/authService';

function ForumPostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await forumService.getForumPostById(id);
        const postData = response.data;
        setPost(postData);
        setLikeCount(postData.likes || 0);
        setLikedUsers(postData.likedUsers || []);
        setLiked(postData.likedUsers?.includes(user?.id) || false);
      } catch (err) {
        setError('Failed to load forum post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user]);

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

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (liked) {
        await forumService.unlikePost(id);
        setLikeCount(prev => prev - 1);
        setLikedUsers(prev => prev.filter(userId => userId !== user.id));
      } else {
        await forumService.likePost(id);
        setLikeCount(prev => prev + 1);
        setLikedUsers(prev => [...prev, user.id]);
      }
      setLiked(!liked);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to update like status');
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      return;
    }

    try {
      const response = await forumService.addComment(id, { content: comment });
      setPost(prev => ({
        ...prev,
        comments: [...prev.comments, response.data]
      }));
      setComment('');
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to add comment');
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/forum')}
                  className="mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              </div>
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

            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`inline-flex items-center px-3 py-1 rounded-md ${
                  liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                disabled={!user}
                title={!user ? "Please login to like" : ""}
              >
                <HeartIcon className={`h-4 w-4 mr-1 ${liked ? 'text-red-600' : 'text-gray-600'}`} />
                {likeCount} Likes
              </button>
              {likedUsers.length > 0 && (
                <div className="flex items-center text-sm text-gray-500">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  {likedUsers.length} users liked this post
                </div>
              )}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
                </div>
                {!user && (
                  <button
                    onClick={() => navigate('/login')}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Login to comment
                  </button>
                )}
              </div>

              {user ? (
                <form onSubmit={handleComment} className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Write a comment..."
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-500">Please login to leave a comment</p>
                </div>
              )}

              {post.comments && post.comments.length > 0 ? (
                <div className="space-y-4">
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
                <p className="text-gray-500">No comments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPostDetails;