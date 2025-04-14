import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./adminsidebar";
import "./bikeshops.css"; // Create this CSS file for styling
import { useNavigate } from "react-router-dom";


const BikeShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);



  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/shops");
      setShops(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;
  
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`http://localhost:3001/api/shops/${id}`);
      alert(response.data.message);
      fetchShops(); // Refresh the list
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete shop');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/shopedit/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <h2>Registered Bike Shops</h2>
        <div className="table-container">
          <table className="shops-table">
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Manager Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop._id}>
                  <td>{shop.shopname}</td>
                  <td>{shop.address}</td>
                  <td>{shop.contact}</td>
                  <td>{shop.name}</td>
                  <td>{shop.email}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(shop._id)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
  onClick={() => handleDelete(shop._id)}
  className="btn-delete"
  disabled={deleteLoading}
>
  {deleteLoading ? 'Deleting...' : 'Delete'}
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BikeShops;