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

const addComment = (postId, comment) => {
  return api.post(`/forum/${postId}/comments`, comment);
};

const updateComment = (postId, commentId, comment) => {
  return api.put(`/forum/${postId}/comments/${commentId}`, comment);
};

const deleteComment = (postId, commentId) => {
  return api.delete(`/forum/${postId}/comments/${commentId}`);
};

const forumService = {
  getAllForumPosts,
  getForumPostById,
  createForumPost,
  updateForumPost,
  deleteForumPost,
  likePost,
  unlikePost,
  addComment,
  updateComment,
  deleteComment,
};

export default forumService;