import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <Link
            to={`/posts/${post.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
