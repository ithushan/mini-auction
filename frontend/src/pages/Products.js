import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const [products, setProducts] = useState();

    const fetchProducts = () => {
        fetch(process.env.REACT_APP_API_URL + '/products')
            .then(res => res.json())
            .then(res => {
                if (res.success && res.products.length > 0) {
                    setProducts(res.products);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (!products) {
        return <div>Loading...</div>; 
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>Products</h1>
            </Grid>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}
