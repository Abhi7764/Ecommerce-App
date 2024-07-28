const productModel = require("../../models/productModel");

const updateProductController = async (req, res) => {
    try {
        const { _id, ...reqBody } = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, reqBody);
        res.json({
            message: "Product update successfully!",
            success: true,
            error: false,
            data: updateProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = updateProductController;