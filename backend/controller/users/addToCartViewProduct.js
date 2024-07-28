const cartModel = require("../../models/cartModel");

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUserId = req?.userId;
        const allProduct = await cartModel.find({
            userId: currentUserId
        }).populate("productId");

        res.json({
            data: allProduct,
            message: "all products",
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

module.exports = addToCartViewProduct;