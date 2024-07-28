// const addProductPermission = require("../helper/addProductPermission");
const productModel = require("../../models/productModel");

const addProductController = async (req, res) => {
    try {
        // const sessionUserId = req.userId;

        // const hasPermission = await addProductPermission(sessionUserId); // Await the permission check
        // console.log(hasPermission)
        // if (!hasPermission) {
        //     throw new Error("Only admin has permission to add the product");
        // }

        const addProduct = new productModel(req.body);
        const saveProduct = await addProduct.save();

        res.status(201).json({
            message: "Product added successfully!",
            success: true,
            error: false,
            data: saveProduct
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = addProductController;
