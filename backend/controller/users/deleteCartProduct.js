const cartModel = require("../../models/cartModel");

const deleteCartProduct = async (req, res) => {
    try {
        const addToCartProductId = req.body._id;
        const deletedProduct = await cartModel.deleteOne({ _id: addToCartProductId });

        res.json({
            message: "product deleted successfully!",
            data: deletedProduct,
            success: true,
            error: false,
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
module.exports = deleteCartProduct;
