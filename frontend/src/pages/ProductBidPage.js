import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductBid from '../components/ProductBid';

const ProductBidPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); 

  const fetchProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`) // Use the ID to fetch the product
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setProduct(res.product); 
        }
      })
      .catch(err => {
        console.error(err); 
      });
  }

  useEffect(() => {
    fetchProduct();
  }, [id]); // Fetch product when component mounts or ID changes

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return <ProductBid product={product} fetchProduct={fetchProduct} />;
};

export default ProductBidPage;
