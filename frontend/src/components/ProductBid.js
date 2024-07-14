import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, Alert, Stack, Box } from '@mui/material';

const ProductBid = (props) => {
    const { product, fetchProduct } = props;
    console.log({ product });
    const [bidAmount, setBidAmount] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleBidSubmit = (event) => {
        event.preventDefault();

        // Reset validation message
        setValidationMessage('');
        setSuccessMessage('');

        // Validate bid amount
        const bid = parseFloat(bidAmount);
        const minAmount = product.lastBidAmount + (product.lastBidAmount * 3 / 100);
        const maxAmount = product.lastBidAmount + (product.lastBidAmount * 20 / 100);
        if (isNaN(bid)) {
            setValidationMessage('Please enter a valid number.');
            return;
        }
        if (bid <= product.lastBidAmount) {
            setValidationMessage(`Your bid must be greater than the last bid amount of ${product.lastBidAmount}.`);
            return;
        }
        if (bid <= minAmount || bid >= maxAmount) {
            setValidationMessage(`Your bid amount must be between ${minAmount.toFixed(2)} and ${maxAmount.toFixed(2)}.`);
            return;
        }

        // update data base
        fetch(process.env.REACT_APP_API_URL + `/product/${product._id}/bid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: bidAmount })
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log(res);

                    // Update the product data
                    setValidationMessage('');
                    setBidAmount('');
                    setSuccessMessage('Bid amount submitted successfully'); // Set success message
                    fetchProduct();

                    // Clear the success message after 3 seconds
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 2000);
                }
            })
            .catch(err => console.error(err)); // Add error handling
    };

    return (
        <Grid container spacing={3}>
             {successMessage && (
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                    <Stack sx={{ width: '100%', textAlign: 'center' }}>
                        <Alert severity="success">{successMessage}</Alert>
                    </Stack>
                </Box>
            )}
            <Grid item md={8} xs={12}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                        {product.description}
                    </Typography>
                    {/* images */}
                    <Grid container spacing={1} mt={2}>
                        <Grid item sm={4} xs={12}>
                            <img
                                src={product.image}
                                alt="Product"
                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px', width: '100%' }}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <img
                                src={product.image2}
                                alt="Product"
                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px', width: '100%' }}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <img
                                src={product.image3}
                                alt="Product"
                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px', width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '10px' }}>
                        Owner Email: {product.ownerEmail}
                    </Typography>
                    <Typography variant="h5" color="error">
                        {product.auctionTime} days more ...
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" mb={2}>
                        Start bidding (LKR)
                    </Typography>
                    <Typography variant="h6" mb={2}>
                        Starting Price: {product.startPrice}
                    </Typography>
                    <Typography variant="h6" mb={3}>
                        Last Bid Amount: {product.lastBidAmount}
                    </Typography>
                    <form onSubmit={handleBidSubmit}>
                        <TextField
                            name='adsad'
                            label="Enter Bid Amount"
                            variant="outlined"
                            fullWidth
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            sx={{ marginBottom: '10px' }}
                            error={!!validationMessage}
                            helperText={validationMessage}
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="success"
                        >
                            Submit Bid Amount
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ProductBid;
