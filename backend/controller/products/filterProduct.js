const productModel = require("../../models/productModel");
const filterProductController = async (req, res) => {
    try {
        const cotegoryList = req?.body?.category || [];
        const product = await productModel.find({
            category: { $in: cotegoryList }
        })

        res.json({
            data: product,
            message: "all filter products",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = filterProductController