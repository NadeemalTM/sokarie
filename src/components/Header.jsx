import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CustomWear</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          {getTotalItems() > 0 && <span className="cart-count">{getTotalItems()}</span>}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
