import React from "react";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= rating ? "gold" : "#666",
            fontSize: "20px",
          }}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
