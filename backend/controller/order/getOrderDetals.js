const orderModel = require("../../models/orderModel");

const getOrderDetalsController = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const orderDetails = await orderModel.find({ userId: currentUserId }).sort({ createdAt: -1 });
        res.json({
            data: orderDetails,
            message: "Order details retrieved successfully",
            success: true,
            error: false,
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = getOrderDetalsController;