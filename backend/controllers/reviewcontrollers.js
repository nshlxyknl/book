const Review = require("../models/Review");
const Book = require("../models/Book");

exports.addreview = async (req, res) => {
  try {
    const {productId }= req.params;
    const {  star, comments } = req.body;
    const { userId, username } = req.user; 

    const product = await Book.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Prevent same user from adding multiple reviews for the same product
    const existing = await Review.findOne({ productId, userId });
    if (existing)
      return res.status(400).json({ message: "You already reviewed this product" });

    const newReview = new Review({
      productId,
      userId,
      username,
      star,
      comments,
    });

    await newReview.save();
    res.json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

// 🟡 Get all reviews for a product
exports.getreview = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    res.json({
      reviews,
      averageRating: avgRating.toFixed(1),
      count: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};
