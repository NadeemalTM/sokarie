import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, selectedColor, selectedSize) => {
    const existingItem = cart.find(
      (item) => item.id === product.id && item.color === selectedColor && item.size === selectedSize
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.color === selectedColor && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, color: selectedColor, size: selectedSize, quantity: 1 }]);
    }
  };

  const removeFromCart = (id, color, size) => {
    setCart(cart.filter((item) => !(item.id === id && item.color === color && item.size === size)));
  };

  const updateQuantity = (id, color, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, color, size);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id && item.color === color && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
