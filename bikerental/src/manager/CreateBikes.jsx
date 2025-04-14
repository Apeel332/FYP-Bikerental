import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBikes() {
  const [BikeNo, setBikeNo] = useState();
  const [BikeName, setBikeName] = useState();
  const [BikeDescription, setBikeDescription] = useState();
  const [BikePrice, setBikePrice] = useState();
  const [file, setFile] = useState(null);
  const [ShopId, setShopId] = useState(null);
  const navigate = useNavigate();

  // Fetch ShopId from the backend using cookie-based auth
  useEffect(() => {
    axios.get("http://localhost:3001/shop/me", {
      withCredentials: true
    })
    .then((res) => {
      if (res.data && res.data.id) {
        setShopId(res.data.id); // Set ShopId from backend
      } else {
        console.error("Invalid response: ", res.data);
      }
    })
    .catch((err) => {
      console.error("Failed to get shop info:", err);
    });
  }, []);

  const Submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("BikeNo", BikeNo);
    formData.append("BikeName", BikeName);
    formData.append("BikeDescription", BikeDescription);
    formData.append("BikePrice", BikePrice);
    formData.append("file", file);
    formData.append("ShopId", ShopId);

    axios.post("http://localhost:3001/CreateBike", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((res) => {
      console.log("Bike created successfully:", res.data);
      navigate("/ManageBikes");
    })
    .catch((err) => {
      console.error("Bike creation failed:", err.response?.data || err.message);
    });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2 className="mb-4">Add Bikes</h2>

          <div className="mb-3">
            <label htmlFor="BikeNo" className="form-label">Bike Number</label>
            <input
              type="number"
              className="form-control"
              id="BikeNo"
              onChange={(e) => setBikeNo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="BikeName" className="form-label">Bike Name</label>
            <input
              type="text"
              className="form-control"
              id="BikeName"
              onChange={(e) => setBikeName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="BikePrice" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="BikePrice"
              onChange={(e) => setBikePrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="BikeDescription" className="form-label">Bike Description</label>
            <textarea
              className="form-control"
              id="BikeDescription"
              onChange={(e) => setBikeDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bikeImage" className="form-label">Upload Bike Image</label>
            <input
              type="file"
              className="form-control"
              id="bikeImage"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateBikes;
