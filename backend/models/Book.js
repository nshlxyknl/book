const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 }, // 0 for free books
    pdfUrl: { type: String, required: true }, // Link to uploaded PDF
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }// // Seller reference
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
