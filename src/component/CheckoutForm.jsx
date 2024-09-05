import React, { useState } from 'react';

function CheckoutForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process checkout information (payment processing not included)
    console.log('Checkout details:', { name, email, address });
    alert('Thank you for your order!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout Form</h2>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="address">Address:</label>
      <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default CheckoutForm;