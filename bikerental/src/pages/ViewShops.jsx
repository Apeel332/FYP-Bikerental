import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarDisplay from "./StarDisplay";

function ViewShops() {
  const [shop, setShop] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams(); // Shop ID

  useEffect(() => {
    axios
      .get(`http://localhost:3001/shopregister/${id}`)
      .then((response) => {
        setShop(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shop details:", error);
      });

    axios
      .get(`http://localhost:3001/bikes/${id}`)
      .then((response) => {
        setBikes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bikes:", error);
      });

    // Fetch reviews for the shop
    axios
      .get(`http://localhost:3001/reviews/shop/${id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      {shop ? (
        <div>
          {/* Shop Details Panel */}
          <div className="bg-primary text-white p-4 mb-4 d-flex align-items-center">
            <div className="row w-100">
              <div className="col-md-4">
                <img
                  src={`http://localhost:3001/uploads/${shop.image}`}
                  alt={shop.shopname}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-8">
                <h2>{shop.shopname}</h2>
                <p><strong>Address:</strong> {shop.address}</p>
                <p><strong>Manager:</strong> {shop.name}</p>
                <p><strong>Contact:</strong> {shop.contact}</p>
              </div>
            </div>
          </div>

          {/* Bikes Cards Section */}
          <div className="container mb-5">
            <h3>Bikes Available</h3>
            <div className="row">
              {bikes.length > 0 ? (
                bikes.map((bike) => (
                  <div key={bike._id} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src={`http://localhost:3001/uploads/${bike.BikeImage}`}
                        className="card-img-top"
                        alt={bike.BikeName}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{bike.BikeName}</h5>
                        <p><strong>Price:</strong> Rs. {bike.BikePrice}/day</p>
                        <p><strong>Status:</strong> {bike.status}</p>
                      </div>
                      <Link
                        to={bike.status === "available" ? `/bookbike/${bike._id}` : "#"}
                        className={`btn btn-dark mt-4 ${bike.status !== "available" ? "disabled" : ""}`}
                        style={{
                          display: "block",
                          borderRadius: "10px",
                          pointerEvents: bike.status !== "available" ? "none" : "auto",
                          opacity: bike.status !== "available" ? 0.5 : 1
                        }}
                      >
                        Book Bike
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No bikes available for this shop.</p>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          {/* Reviews Section */}
<div className="container">
  <h3>Customer Reviews</h3>
  {reviews.length > 0 ? (
    <div className="row">
      {reviews.map((review) => (
        <div key={review._id} className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h5 className="text-primary">{review.reviewerName}</h5>
            <StarDisplay rating={review.rating} /> {/* Display star rating */}
            <p className="mb-1">{review.reviewText}</p>
            <small className="text-muted">
              {new Date(review.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No reviews available for this shop.</p>
  )}
</div>

        </div>
      ) : (
        <p>Loading shop details...</p>
      )}
    </div>
  );
}

export default ViewShops;
