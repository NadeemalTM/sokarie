import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {hovered && (
            <div className="hover-overlay">
              <p>View Details</p>
            </div>
          )}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
            <span>({product.rating})</span>
          </div>
          <p className="price">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
