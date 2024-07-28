const productModel = require("../../models/productModel");

const categoryWiseProduct = async (req, res) => {
    try {
        const { category } = req?.body || req?.query;
        const product = await productModel.find({ category });

        res.status(200).json({
            message: "all category products",
            data: product,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = categoryWiseProduct