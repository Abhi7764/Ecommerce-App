const productModel = require("../../models/productModel");
const singleProductCategory = async (req, res) => {
    try {
        const productCategory = await productModel.find().distinct("category");
        // console.log("product", productCategory);

        // Array to store one product from each category
        const productByCategory = [];

        for (const category of productCategory) {
            const product = await productModel.findOne({ category })
            if (product) {
                productByCategory.push(product);
            }
        }
        res.status(200).json({
            message: "all category products",
            data: productByCategory,
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

module.exports = singleProductCategory;