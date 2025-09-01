import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        if (response.data) {
          setSelectedColor(response.data.colors[0]);
          setSelectedSize(response.data.sizes[0]);
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

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      setMessage('Please login to add a review');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/products/${id}/reviews`, {
        user: user.email,
        rating: reviewRating,
        comment: reviewText,
      });
      setProduct({ ...product, reviews: [...(product.reviews || []), response.data] });
      setReviewText('');
      setReviewRating(5);
      setMessage('Review added successfully!');
    } catch (error) {
      setMessage('Failed to add review');
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

      <div className="reviews-section">
        <h2>Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-list">
            {product.reviews.map((review) => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <span className="review-rating">{'★'.repeat(review.rating)}</span>
                  <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {isAuthenticated() && (
          <form onSubmit={handleAddReview} className="add-review-form">
            <h3>Add Your Review</h3>
            <div className="form-group">
              <label>Rating:</label>
              <select value={reviewRating} onChange={(e) => setReviewRating(parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Comment:</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="4"
                required
              />
            </div>
            <button type="submit" className="submit-review-btn">Submit Review</button>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </motion.div>
  );
};

export default ProductDetail;
