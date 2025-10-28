const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, default: 0 }, 
    pdfUrl: { type: String, required: true }, 
    previewUrl: { type: String },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["available", "sold"], default: "available" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
