const ProductModel = require('../model/productModel');

// get product API -  /app/v1/products/ 
exports.getProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({});
        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// get product API -  /app/v1/products/ 
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}


// get single product API -  /app/b1/products/ 
exports.bidProduct = async (req, res, next) => {
    const { productId } = req.params;
    console.log(req.body);
    const { amount } = req.body;

    console.log({ productId, amount });
    try {
        const product = await ProductModel.findById(productId);
        if(!product){
           return  res.status(404).json({
            success: false,
            message: 'Not Found'
        }); 
        }

        product.lastBidAmount = amount;
        await product.save();

        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}