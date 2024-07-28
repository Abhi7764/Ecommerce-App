const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    quantity: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, {
    timestamps: true
})


const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;