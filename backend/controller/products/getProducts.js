const productModel = require("../../models/productModel");

const getProductsController = async (req, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });
        res.json({
            message: "All products",
            data: products,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = getProductsController