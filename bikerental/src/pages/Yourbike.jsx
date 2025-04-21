import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../user/Navbar";
import StarRating from "./StarRating";

const Yourbike = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3001/bookings/user", {
          withCredentials: true,
        });
        const sortedBookings = res.data.sort(
          (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
        );
        setBookings(sortedBookings);
        if (res.data.length > 0) setUserName(res.data[0].name);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchConfirmedBookings();
  }, []);

  const isExpired = (bookingDate) => {
    return new Date().getTime() > new Date(bookingDate).getTime();
  };

  const handleReviewChange = (id, value) => {
    setReviews((prev) => ({ ...prev, [id]: value }));
  };

  const handleRatingChange = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  const submitReview = async (bookingId) => {
    const reviewText = reviews[bookingId];
    const rating = ratings[bookingId] || 0;
    const reviewerName = userName;

    if (!reviewText || rating < 1 || rating > 5) {
      return alert("Please write a review and choose a rating.");
    }

    try {
      await axios.post(
        "http://localhost:3001/reviews/reviewpost",
        { bookingId, reviewText, rating, reviewerName },
        { withCredentials: true }
      );

      alert("Review submitted successfully!");
      setReviews((prev) => ({ ...prev, [bookingId]: "" }));
      setRatings((prev) => ({ ...prev, [bookingId]: 0 }));
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4" style={{ color: "gold" }}>
        Your Bookings (Latest First)
      </h2>
      {bookings.length === 0 ? (
        <p className="text-center" style={{ color: "gold" }}>
          No bike bookings found.
        </p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-6 col-lg-4 mb-4" key={booking._id}>
              <div
                className="card h-100 shadow"
                style={{ backgroundColor: "#000", border: "1px solid gold", color: "gold" }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <div className="w-50 pe-2">
                      <h5 className="card-title fw-bold">{booking.bikeName}</h5>
                      <p className="card-text"><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                      <p className="card-text"><strong>Package:</strong> {booking.package}</p>
                      <p className="card-text"><strong>Shop:</strong> {booking.ShopId ? booking.ShopId.shopname : "Unknown"}</p>
                    </div>

                    {isExpired(booking.bookingDate) && (
                      <div className="w-50 ps-2 border-start border-warning">
                        <label className="form-label fw-semibold">Review:</label>
                        <StarRating
                          rating={ratings[booking._id] || 0}
                          setRating={(value) => handleRatingChange(booking._id, value)}
                        />
                        <textarea
                          className="form-control"
                          style={{ backgroundColor: "#111", color: "gold", borderColor: "gold" }}
                          rows="4"
                          value={reviews[booking._id] || ""}
                          onChange={(e) => handleReviewChange(booking._id, e.target.value)}
                          placeholder="Share your experience..."
                        />
                        <button
                          onClick={() => submitReview(booking._id)}
                          className="btn mt-2"
                          style={{ backgroundColor: "gold", color: "#000", fontWeight: "bold" }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Yourbike;
