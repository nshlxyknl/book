const mongoose = require("mongoose")

const salesItems = new mongoose.Schema({
    buyerId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    title: String,
    price: Number,
    quantity: Number,
    date: { type: Date, default: Date.now },
},{ timestamps: true }
)

module.exports = mongoose.model("Sales", salesItems);