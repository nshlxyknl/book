const mongoose = require("mongoose")

const cartItems = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
title: String,
    price: Number,
    
})

const cartSchema = new mongoose.Schema({

    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: [cartItems]

})


module.exports = mongoose.model("Cart", cartSchema)