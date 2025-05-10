import api from '../utils/api';

const getAllForumPosts = () => {
  return api.get('/forum');
};

const getForumPostById = (id) => {
  return api.get(`/forum/${id}`);
};

const createForumPost = (data) => {
  return api.post('/forum', data);
};

const updateForumPost = (id, data) => {
  return api.put(`/forum/${id}`, data);
};

const deleteForumPost = (id) => {
  return api.delete(`/forum/${id}`);
};

const likePost = (id) => api.post(`/forum/${id}/like`);
const unlikePost = (id) => api.post(`/forum/${id}/unlike`);

const forumService = {
  getAllForumPosts,
  getForumPostById,
  createForumPost,
  updateForumPost,
  deleteForumPost,
  likePost,
  unlikePost,
};

export default forumService;