import React, { useContext } from 'react';
import CartContext from './CartContext';

function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <img src={item.image} alt={item.name} width="50" />
              <span>{item.name}</span>
              <span>Price: ${item.price.toFixed(2)}</span>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => removeFromCart(item)}>Remove</button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item, e.target.value)}
              />
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <p>
          Total Price: <strong>${getTotalPrice().toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
}

export default ShoppingCart;