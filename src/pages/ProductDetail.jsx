import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const foundProduct = response.data.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
        if (foundProduct) {
          setSelectedColor(foundProduct.colors[0]);
          setSelectedSize(foundProduct.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      addToCart(product, selectedColor, selectedSize);
      alert('Added to cart!');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <motion.div
      className="product-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-detail-content">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <div className="customization">
            <div className="color-selector">
              <label>Color:</label>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {product.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="size-selector">
              <label>Size:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
