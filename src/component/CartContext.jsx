import React, { createContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Check if product already exists in cart
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item._id !== product._id));
  };

  const updateQuantity = (product, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;