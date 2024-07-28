const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q
        // console.log(query);
        const regex = new RegExp(query, 'i', 'g') // i- remove the case sensetive and g for the globaly search

        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });

        res.json({
            data: product,
            message: "search product",
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

module.exports = searchProduct;