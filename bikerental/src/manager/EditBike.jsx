import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBike() {
  const [bike, setBike] = useState({});
  const [formData, setFormData] = useState({
    BikeNo: '',
    BikeName: '',
    BikeDescription: '',
    BikePrice: '',
    BikeImage: null
  });
  const { bikeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/bike/${bikeId}`)
      .then(res => {
        setBike(res.data);
        setFormData({
          BikeNo: res.data.BikeNo,
          BikeName: res.data.BikeName,
          BikeDescription: res.data.BikeDescription,
          BikePrice: res.data.BikePrice,
          BikeImage: null
        });
      })
      .catch(err => {
        console.error("Error fetching bike data:", err);
      });
  }, [bikeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      BikeImage: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBike = new FormData();
    updatedBike.append('BikeNo', formData.BikeNo);
    updatedBike.append('BikeName', formData.BikeName);
    updatedBike.append('BikeDescription', formData.BikeDescription);
    updatedBike.append('BikePrice', formData.BikePrice);
    if (formData.BikeImage) {
      updatedBike.append('BikeImage', formData.BikeImage);
    }

    axios.put(`http://localhost:3001/bike/${bikeId}`, updatedBike, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        navigate('/ManageBikes');
      })
      .catch(err => {
        console.error('Error updating bike:', err);
      });
  };

  return (
    <div className="container">
      <h3>Edit Bike</h3>

      {bike.BikeImage && (
        <div className="mb-4">
          <h5>Current Image:</h5>
          <img
            src={`http://localhost:3001/uploads/${bike.BikeImage}`}
            alt="Current Bike"
            style={{ width: '300px', height: 'auto', borderRadius: '10px', border: '1px solid #ccc' }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="BikeNo" className="form-label">Bike No</label>
          <input
            type="number"
            className="form-control"
            id="BikeNo"
            name="BikeNo"
            value={formData.BikeNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="BikeName" className="form-label">Bike Name</label>
          <input
            type="text"
            className="form-control"
            id="BikeName"
            name="BikeName"
            value={formData.BikeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="BikeDescription" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="BikeDescription"
            name="BikeDescription"
            value={formData.BikeDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="BikePrice" className="form-label">Price per Day</label>
          <input
            type="number"
            className="form-control"
            id="BikePrice"
            name="BikePrice"
            value={formData.BikePrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="BikeImage" className="form-label">Upload New Image</label>
          <input
            type="file"
            className="form-control"
            id="BikeImage"
            name="BikeImage"
            onChange={handleFileChange}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Update Bike</button>
        </div>
      </form>
    </div>
  );
}

export default EditBike;
