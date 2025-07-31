import Review from "../models/reviewModels.js";

export const addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { productId } = req.params;

    const review = new Review({
      productId,
      comment,
      rating
    });

    await review.save();
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
