import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerSidebar from './ManagerSidebar';

function ManageShop() {
  const [shop, setShop] = useState(null);
  const [editedShop, setEditedShop] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/users', { withCredentials: true })
      .then(res => {
        if (res.data?.email) {
          axios.get(`http://localhost:3001/shopregister`)
            .then(result => {
              const currentShop = result.data.find(s => s.email === res.data.email);
              setShop(currentShop);
              setEditedShop(currentShop);
              setPreviewImage(`http://localhost:3001/uploads/${currentShop.image}`);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setEditedShop({ ...editedShop, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(editedShop).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await axios.put(`http://localhost:3001/shopregister/${shop._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      alert("Shop updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Error updating shop.");
    }
  };

  if (!shop) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar - full height on left */}
      <div className="bg-dark" style={{ width: '250px', minHeight: '100vh' }}>
        <ManagerSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ maxWidth: '600px', width: '100%' }}>
            <h4 className="mb-4 text-center">Manage Shop Info</h4>

            {/* Reasonable image size */}
            <div className="mb-3 text-center">
              <img
                src={previewImage}
                alt="Shop"
                className="rounded border"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Change Image</label>
              <input type="file" name="image" className="form-control" onChange={handleImageChange} />
            </div>

            {['shopname', 'address', 'contact', 'name', 'email'].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">
                  {field === 'shopname' ? 'Shop Name' : 
                   field === 'contact' ? 'Contact' : 
                   field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'contact' ? 'number' : 'text'}
                  name={field}
                  value={editedShop[field] || ''}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            ))}

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-success">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageShop;






















