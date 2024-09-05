import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductDetails({ match }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${match.params.id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [match.params.id]);

  const handleAddToCart = () => {
    // Implement logic to add product to shopping cart
    console.log('Adding product to cart:', product);
  };

  return (
    <div>
      <h1>Product Details</h1>
      {product && (
        <div>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;