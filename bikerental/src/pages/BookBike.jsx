import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Set axios to include cookies with every request
axios.defaults.withCredentials = true;

function BookBike() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    bookingDate: '',
    package: '1 day'
  });

  useEffect(() => {
    // Fetch bike details by ID
    if (id) {
      axios.get(`http://localhost:3001/bike/${id}`)
        .then((res) => setBike(res.data))
        .catch((err) => console.error("Error fetching bike:", err));
    }

    // Fetch user info from backend (automatically extracts user from token in cookie)
    axios.get('http://localhost:3001/user')
      .then((res) => {
        setFormData(prev => ({
          ...prev,
          name: res.data.name || '',
          email: res.data.email || ''
        }));
      })
      .catch(err => console.error("Error fetching user info:", err));
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
  const handleBooking = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/bookings', {
        contact: formData.contact,
        bookingDate: formData.bookingDate,
        package: formData.package,
        bikeId: id  // use the ID from the URL
      });
  
      if (response.status === 201) {
        alert("Booking successful!");
        console.log("Booking saved:", response.data);
      } else {
        alert("Booking failed.");
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      alert("Booking error");
      console.error("Error during booking:", error.response?.data || error.message);
    }
  };
  

  // Show loading message if bike details haven't been fetched yet
  if (!bike) return <p className="text-center mt-5 fs-5 fw-light">Loading bike details...</p>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg rounded-4 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6 p-4 bg-light bg-gradient">
            <div className="card-body p-4">
              <h2 className="card-title mb-4 fw-bold display-5 font-monospace text-uppercase text-primary">
                {bike.BikeName}
              </h2>
              <p className="card-text fs-5 mb-3">
                <span className="fw-semibold text-secondary">Bike No:</span>
                <span className="text-dark ms-2">{bike.BikeNo}</span>
              </p>
              <p className="card-text fs-5 mb-3">
                <span className="fw-semibold text-secondary">Description:</span>
                <span className="text-dark ms-2">{bike.BikeDescription}</span>
              </p>
              <p className="card-text fs-5">
                <span className="fw-semibold text-secondary">Price:</span>
                <span className="text-dark ms-2">Rs. {bike.BikePrice}/day</span>
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <img
              src={`http://localhost:3001/uploads/${bike.BikeImage}`}
              alt={bike.BikeName}
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="card mt-4 p-4 shadow rounded-4">
        <h3 className="mb-4 text-primary">Book This Bike</h3>
        <form onSubmit={handleBooking}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              className="form-control"
              value={formData.bookingDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Select Package</label>
            <select
              name="package"
              className="form-select"
              value={formData.package}
              onChange={handleChange}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={`${i + 1} day`}>{i + 1} day</option>
              ))}
              <option value="Over a month">Over a month</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary px-4 py-2">Book Now</button>
        </form>
      </div>
    </div>
  );
}

export default BookBike;
