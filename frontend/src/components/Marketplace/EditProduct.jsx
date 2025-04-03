import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import marketplaceService from '../services/marketplaceService';

function EditProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    marketplaceService.getProductById(id).then((response) => {
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setImageUrl(response.data.imageUrl);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    marketplaceService
      .updateProduct(id, { name, description, price, imageUrl })
      .then(() => {
        navigate(`/marketplace/${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;