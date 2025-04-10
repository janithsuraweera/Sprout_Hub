import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import marketplaceService from '../../services/marketplaceService';
import authService from '../../services/authService';

function MarketplaceList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = authService.getCurrentUser();

  useEffect(() => {
    marketplaceService
      .getAllProducts()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Marketplace</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/marketplace/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      {user && <Link to="/marketplace/create">Create Product</Link>}
    </div>
  );
}

export default MarketplaceList;