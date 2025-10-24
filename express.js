// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS so frontend can fetch data
app.use(cors());

// Sample product data
const products = [
  { id: 1, name: 'Laptop', price: 80000 },
  { id: 2, name: 'Phone', price: 25000 },
  { id: 3, name: 'Headphones', price: 2000 },
];

// API endpoint
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong>: ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;


// App.js
import React from 'react';
import ProductList from './ProductList';

function App() {
  return (
    <div>
      <h1>My Product Store</h1>
      <ProductList />
    </div>
  );
}

export default App;
