import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const handleAddToCart = (product) => {
    // Implement logic to add product to shopping cart
    console.log('Adding product to cart:', product);
  };

  return (
    <div>
      <h1>Product Listing</h1>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductListing;