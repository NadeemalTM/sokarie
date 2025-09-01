import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would process the payment
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={`${item.id}-${item.color}-${item.size}`} className="summary-item">
              <p>{item.name} ({item.color}, {item.size}) x {item.quantity}</p>
              <p>${item.price * item.quantity}</p>
            </div>
          ))}
          <h3>Total: ${getTotalPrice()}</h3>
        </div>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
