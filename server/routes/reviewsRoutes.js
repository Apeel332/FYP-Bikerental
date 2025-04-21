const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Booking = require("../models/ConfirmedBooking");

// POST review with rating
router.post("/reviewpost", async (req, res) => {
  try {
    const { bookingId, reviewText, rating, reviewerName } = req.body;

    const booking = await Booking.findById(bookingId).populate("ShopId").populate("bikeId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const newReview = new Review({
      reviewText,
      rating,
      bookingId: booking._id,
      bikeId: booking.bikeId,
      shopId: booking.ShopId._id,
      userId: booking.userId,
      reviewerName,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/shop/:shopId", async (req, res) => {
  try {
    const reviews = await Review.find({ shopId: req.params.shopId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/average/:shopId", async (req, res) => {
  const { shopId } = req.params;

  try {
    const reviews = await Review.find({ shopId });

    if (reviews.length === 0) {
      return res.json({ averageRating: 0 });
    }

    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const averageRating = totalRating / reviews.length;

    res.json({ averageRating: Math.round(averageRating * 10) / 10 }); // rounded to 1 decimal
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).json({ message: "Failed to get average rating" });
  }
});

module.exports = router;
