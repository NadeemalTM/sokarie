import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();

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
        {isAuthenticated() ? (
          <>
            {isAdmin() && <Link to="/admin">Admin</Link>}
            <span className="user-info">
              <FontAwesomeIcon icon={faUser} /> {user.email}
            </span>
            <button onClick={logout} className="logout-btn">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
