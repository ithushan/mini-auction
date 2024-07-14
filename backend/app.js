const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');


// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Debugging statements
console.log(`Loaded PORT: ${process.env.PORT}`); 
console.log(`Loaded NODE_ENV: ${process.env.NODE_ENV}`); 
const PORT = process.env.PORT || 5000;

// get product in routes folder
const Products = require('./routes/products');
// call Database connection
connectDatabase();

// set cros error // Middleware
app.use(cors());
app.use(express.json());

// set prefix
app.use('/api/v1/',Products);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
