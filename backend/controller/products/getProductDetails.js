const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;
        //console.log(productId);
        const product = await productModel.findById(productId);

        res.status(200).json({
            message: "Products Details",
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

module.exports = getProductDetails;