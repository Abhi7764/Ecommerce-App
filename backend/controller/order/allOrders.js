const orderModel = require("../../models/orderModel");
const allOrderController = async (req, res) => {
    try {
        const allOrder = await orderModel.find().sort({ createdAt: -1 });;
        res.status(202).json({
            data: allOrder,
            message: "All Order details retrieved successfully",
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
module.exports = allOrderController