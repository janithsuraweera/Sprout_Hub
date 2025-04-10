import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import marketplaceService from '../../services/marketplaceService';

function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    marketplaceService
      .createProduct({ name, description, price, imageUrl })
      .then(() => {
        navigate('/marketplace');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;