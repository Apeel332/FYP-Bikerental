import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./adminsidebar";
import "./bikeshops.css"; // Create this CSS file for styling
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Addshops = () => {
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

  const handleAddShop = () => {
    navigate("/addshop"); // Assuming you have a route for adding shops
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <div className="shops-header">
          <h2>Registered Bike Shops</h2>
          <Link to="/shopreg" className="btn btn-primary">
          Add Shop
        </Link>
        </div>
        <div className="table-container">
          <table className="shops-table">
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Manager Name</th>
                <th>Email</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Addshops;