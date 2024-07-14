const express = require('express');
const { getProducts, bidProduct, getSingleProduct } = require('../controller/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/:productId').get(getSingleProduct); 
router.route('/product/:productId/bid').post(bidProduct);

module.exports = router;

