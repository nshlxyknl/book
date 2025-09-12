const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, default: 0 }, // 0 for free books
    pdfUrl: { type: String, required: true }, // Link to uploaded PDF
    previewUrl: {type: String},
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },// // Seller reference
    status: { type: String, enum: ["available", "sold"], default: "available" }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
