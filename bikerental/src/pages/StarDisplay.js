// import React from "react";

// const StarDisplay = ({ rating }) => {
//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           style={{
//             color: star <= rating ? "gold" : "#ccc",
//             fontSize: "18px",
//             marginRight: "2px"
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// };

// export default StarDisplay;
import React from "react";

const StarDisplay = ({ rating }) => {
  const stars = [];
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<span key={i} style={{ color: "#ffc107" }}>★</span>);
    } else {
      stars.push(<span key={i} style={{ color: "#e4e5e9" }}>☆</span>);
    }
  }

  return <div>{stars}</div>;
};

export default StarDisplay;
