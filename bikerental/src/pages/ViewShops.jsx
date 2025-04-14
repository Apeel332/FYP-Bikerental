import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ViewShops() {
  const [shop, setShop] = useState(null);
  const [bikes, setBikes] = useState([]);
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
          <div className="container">
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
                        <p className="card-text">{bike.BikeDescription}</p>
                        <p><strong>Bike No:</strong> {bike.BikeNo}</p>
                        <p><strong>Price:</strong> Rs. {bike.BikePrice}/day</p>
                      </div>
                      <Link to={`/bookbike/${bike._id}`} className="btn btn-dark mt-4" style={{display: "block", borderRadius: "10px"}}
                                          
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
        </div>
      ) : (
        <p>Loading shop details...</p>
      )}
    </div>
  );
}

export default ViewShops;
