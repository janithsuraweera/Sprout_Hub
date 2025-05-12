import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';

function PostCard({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [commentsCount, setCommentsCount] = useState(post.comments?.length || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* User Info Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <img
            src={post.user?.profileImage || 'https://via.placeholder.com/40'}
            alt={post.user?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <Link to={`/profile/${post.user?.id}`} className="font-semibold text-gray-900 hover:underline">
              {post.user?.username || 'Anonymous User'}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {post.content}
        </p>
        {post.image && (
          <div className="mb-4">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Interaction Stats */}
      <div className="px-4 py-2 border-t border-b bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <FaHeart className="text-red-500" />
            <span>{likesCount} likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaComment />
            <span>{commentsCount} comments</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 divide-x">
        <button
          onClick={handleLike}
          className={`flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>Like</span>
        </button>
        <Link
          to={`/posts/${post.id}`}
          className="flex items-center justify-center space-x-2 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <FaComment />
          <span>Comment</span>
        </Link>
        <button className="flex items-center justify-center space-x-2 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          <FaShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
