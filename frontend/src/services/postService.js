import api from '../utils/api';

const getAllPosts = () => {
  return api.get('/posts');
};

const getPostById = (id) => {
  return api.get(`/posts/${id}`);
};

const createPost = (data) => {
  return api.post('/posts', data);
};

const updatePost = (id, data) => {
  return api.put(`/posts/${id}`, data);
};

const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

const postService = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

export default postService;