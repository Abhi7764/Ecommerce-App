const cartModel = require("../../models/cartModel");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUserId = req.userId;

        const isProductAvailable = await cartModel.findOne({ productId: productId, userId: currentUserId });
        //console.log("isProductAvailable", isProductAvailable)

        if (isProductAvailable) {
            return res.json({
                message: "Product already in Cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUserId
        }

        const newProduct = new cartModel(payload);

        const saveProduct = await newProduct.save();

        return res.json({
            message: "Product added to Cart",
            success: true,
            error: false,
            data: saveProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = addToCartController;