import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarDisplay from "./StarDisplay";
import { Navbar } from "react-bootstrap";

function ViewShops() {
  const [shop, setShop] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/shopregister/${id}`)
      .then((response) => setShop(response.data))
      .catch((error) => console.error("Error fetching shop details:", error));

    axios.get(`http://localhost:3001/bikes/${id}`)
      .then((response) => setBikes(response.data))
      .catch((error) => console.error("Error fetching bikes:", error));

    axios.get(`http://localhost:3001/reviews/shop/${id}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  return (
    <div className="container mt-5">
   
      {/* Internal CSS */}
      <style>
        {`
          body {
            background-color: #ffffff; /* Keep white background */
            color: #333333; /* Slightly dark text for readability */
          }
          .shop-header {
            background-color: #f5f5f5; /* Light gray */
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .bike-card {
            background-color: #fafafa; /* Very light gray */
            color: #333;
            border-radius: 12px;
            border: none;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .bike-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }
          .bike-title {
            color: #d4af37; /* Gold color */
            font-weight: bold;
          }
          .review-card {
            background-color: #f9f9f9;
            border-left: 5px solid #d4af37; /* Gold stripe */
            color: #444;
            border-radius: 10px;
            padding: 15px;
            height: 100%;
          }
          .btn-book {
            background-color: #d4af37; /* Gold button */
            border: none;
            font-weight: bold;
            border-radius: 8px;
            color: white;
          }
          .btn-book:hover {
            background-color: #bfa334;
          }
          .section-title {
            color: #d4af37;
            font-weight: bold;
          }
          .text-light-muted {
            color: #777;
          }
        `}
      </style>

      {shop ? (
        <div>
          {/* Shop Details */}
          <div className="shop-header mb-5">
            <div className="row align-items-center">
              <div className="col-md-4 text-center">
                <img
                  src={`http://localhost:3001/uploads/${shop.image}`}
                  alt={shop.shopname}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <h2 className="mb-3">{shop.shopname}</h2>
                <p><strong>📍 Address:</strong> {shop.address}</p>
                <p><strong>👨‍💼 Manager:</strong> {shop.name}</p>
                <p><strong>📞 Contact:</strong> {shop.contact}</p>
              </div>
            </div>
          </div>

          {/* Bikes Section */}
          <div className="mb-5">
            <h3 className="mb-4 section-title">🚲 Bikes Available</h3>
            <div className="row">
              {bikes.length > 0 ? (
                bikes.map((bike) => (
                  <div key={bike._id} className="col-md-4 mb-4">
                    <div className="card bike-card shadow-sm" style={{backgroundColor: '#f9f9f9'}}>
                      <img
                        src={`http://localhost:3001/uploads/${bike.BikeImage}`}
                        className="card-img-top rounded-top"
                        alt={bike.BikeName}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title bike-title">{bike.BikeName}</h5>
                        <p className="text-dark" style={{fontSize: "12px"}}><strong >Price:</strong> Rs. {bike.BikePrice}/day</p>
                        <p  className="text-dark" style={{fontSize: "12px"}}><strong>Status:</strong> {bike.status}</p>
                      </div>
                      <div className="p-3">
                        <Link
                          to={bike.status === "available" ? `/bookbike/${bike._id}` : "#"}
                          className={`btn btn-book w-100 ${bike.status !== "available" ? "disabled" : ""}`}
                          style={{
                            pointerEvents: bike.status !== "available" ? "none" : "auto",
                            opacity: bike.status !== "available" ? 0.6 : 1
                          }}
                        >
                          {bike.status === "available" ? "Book Now" : "Not Available"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-light-muted">No bikes available for this shop.</p>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-5">
            <h3 className="mb-4 section-title">💬 Customer Reviews</h3>
            {reviews.length > 0 ? (
              <div className="row">
                {reviews.map((review) => (
                  <div key={review._id} className="col-md-6 mb-4">
                    <div className="review-card shadow-sm">
                      <h5 className="bike-title">{review.reviewerName}</h5>
                      <StarDisplay rating={review.rating} />
                      <p className="mt-2">{review.reviewText}</p>
                      <small className="text-muted">
                        {new Date(review.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-light-muted">No reviews available for this shop.</p>
            )}
          </div>

        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-warning">Loading shop details...</p>
        </div>
      )}
    </div>
  );
}

export default ViewShops;
