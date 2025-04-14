import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from './adminsidebar';
import './shopedit.css';

const EditShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shop, setShop] = useState({
    shopname: '',
    address: '',
    contact: '',
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchShop = async () => {
      try {
      
        const response = await axios.get(`http://localhost:3001/api/shops/${id}`);
        console.log(response.data); // Debug: log the response
        setShop(response.data); // Update state with the shop data
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setError("Failed to load shop: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:3001/api/shops/${id}`, shop);
      navigate('/bikeshops');
    } catch (error) {
      setError('Failed to update shop: ' + error.message);
    }
  };

  if (loading) return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <div className="loading-message">Loading shop data...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/bikeshops')}>Back to Shops</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <div className="edit-shop-container">
          <h2>Edit Shop Details</h2>
          <form onSubmit={handleSubmit} className="edit-shop-form">
            <div className="form-group">
              <label htmlFor="shopname">Shop Name:</label>
              <input
                type="text"
                id="shopname"
                name="shopname"
                value={shop.shopname || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shop.address || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={shop.contact || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Manager Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shop.name || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={shop.email || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">Save Changes</button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => navigate('/bikeshops')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShop;