const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    image: {
        type: String,
        required: true
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    auctionTime: {
        type: Number,
        required: true,
        min: [1, 'Auction time must be at least 1 hour.']
    },
    startPrice: {
        type: Number,
        required: true,
        min: [0, 'Start price must be a positive number.']
    },
    lastBidAmount: {
        type: Number,
        required: true,
        min: [0, 'Bid amount must be a positive number.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
