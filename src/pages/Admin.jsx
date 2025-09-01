import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Admin.css';

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    colors: '',
    sizes: '',
    image: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  if (!isAdmin()) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price),
          colors: product.colors.split(',').map(c => c.trim()),
          sizes: product.sizes.split(',').map(s => s.trim()),
          rating: 0,
        }),
      });

      if (response.ok) {
        setMessage('Product added successfully!');
        setProduct({
          name: '',
          category: '',
          price: '',
          colors: '',
          sizes: '',
          image: '',
          description: '',
        });
      } else {
        setMessage('Failed to add product');
      }
    } catch (error) {
      setMessage('Error adding product');
    }
  };

  return (
    <div className="admin">
      <div className="admin-container">
        <h1>Admin Dashboard - Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="colors">Colors (comma-separated)</label>
            <input
              type="text"
              id="colors"
              name="colors"
              value={product.colors}
              onChange={handleChange}
              placeholder="red, blue, black"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sizes">Sizes (comma-separated)</label>
            <input
              type="text"
              id="sizes"
              name="sizes"
              value={product.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="add-product-btn">Add Product</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Admin;
