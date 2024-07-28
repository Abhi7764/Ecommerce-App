const cartModel = require("../../models/cartModel");

const updateCartProduct = async (req, res) => {
    try {
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;

        const upadateProduct = await cartModel.updateOne(
            { _id: addToCartProductId }, {
            ...(qty && { quantity: qty })
        })
        //console.log(upadateProduct)

        res.json({
            data: upadateProduct,
            message: "Quantity upadate successfully!",
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

module.exports = updateCartProduct;