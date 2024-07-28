const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },

    brandName: {
        type: String,
        required: true,
    },

    category: String,
    productImage: [],
    price: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    description: String
}, {
    timestamps: true
})


const productModel = mongoose.model("product", productSchema);

module.exports = productModel;