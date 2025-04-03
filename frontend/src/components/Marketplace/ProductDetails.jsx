import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import marketplaceService from '../services/marketplaceService';
import authService from '../services/authService';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const user = authService.getCurrentUser();

  useEffect(() => {
    marketplaceService.getProductById(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <img src={product.imageUrl} alt={product.name} />
      {user && <Link to={`/marketplace/edit/${product.id}`}>Edit Product</Link>}
    </div>
  );
}

export default ProductDetails;