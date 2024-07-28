const cartModel = require("../../models/cartModel");

const countCartProduct = async (req, res) => {
    try {
        const currentUserId = req?.userId;
        const count = await cartModel.countDocuments({
            userId: currentUserId
        })
        res.json({
            data: {
                count: count
            },
            message: "ok",
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = countCartProduct;