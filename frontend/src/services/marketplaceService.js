import api from '../utils/api';

const getAllProducts = () => {
  return api.get('/marketplace');
};

const getProductById = (id) => {
  return api.get(`/marketplace/${id}`);
};

const createProduct = (data) => {
  return api.post('/marketplace', data);
};

const updateProduct = (id, data) => {
  return api.put(`/marketplace/${id}`, data);
};

const deleteProduct = (id) => {
  return api.delete(`/marketplace/${id}`);
};

const marketplaceService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default marketplaceService;