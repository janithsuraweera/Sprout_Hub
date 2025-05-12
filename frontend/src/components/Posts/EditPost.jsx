import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postService from '../../services/postService';

function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    postService.getPostById(id).then((response) => {
      setTitle(response.data.title);
      setContent(response.data.content);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postService
      .updatePost(id, { title, content })
      .then(() => {
        navigate(`/posts/${id}`);
      })
      .catch((err) => {
        console.error(err);
        // Handling errors
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Edit Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/posts/${id}`)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
