import React, { useEffect, useState } from 'react'
import ManagerSidebar from './ManagerSidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ManageBikes() {
  const [shopId, setShopId] = useState(null)
  const [bikes, setBikes] = useState([])

  // Get shop ID using JWT
  useEffect(() => {
    axios.get('http://localhost:3001/shop/me', { withCredentials: true })
      .then(res => {
        setShopId(res.data.id)
        console.log("Shop ID:", res.data.id)
      })
      .catch(err => {
        console.error('Error fetching shop info:', err)
      })
  }, [])

  // Fetch bikes for this shop and sort by BikeNo
  useEffect(() => {
    if (shopId) {
      axios.get(`http://localhost:3001/bikes/${shopId}`)
        .then(res => {
          const sortedBikes = res.data.sort((a, b) => a.BikeNo - b.BikeNo)
          setBikes(sortedBikes)
          console.log("Bikes fetched:", sortedBikes)
        })
        .catch(err => {
          console.error('Error fetching bikes:', err)
        })
    }
  }, [shopId])

  const handleDelete = (bikeId) => {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      axios.delete(`http://localhost:3001/bike/${bikeId}`, {
        withCredentials: true
      })
        .then(() => {
          setBikes(prev => prev.filter(b => b._id !== bikeId));
        })
        .catch(err => {
          console.error('Error deleting bike:', err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 bg-light vh-100">
          <ManagerSidebar />
        </div>

        <div className="col-md-9 col-lg-10 p-4">
          <Link to="/CreateBikes" className="btn btn-primary mb-4">
            Add Bikes
          </Link>

          <h3>Bikes List</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Bike No</th>
                  <th>Bike Name</th>
                  <th>Description</th>
                  <th>Price/Per Day</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bikes.length > 0 ? (
                  bikes.map(bike => (
                    <tr key={bike._id}>
                      <td>{bike.BikeNo}</td>
                      <td>{bike.BikeName}</td>
                      <td>{bike.BikeDescription}</td>
                      <td>Rs. {bike.BikePrice}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <Link to={`/editbike/${bike._id}`} className="btn btn-sm btn-warning">
                            <i className="bi bi-pencil-square"></i> Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(bike._id)}
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                          <button className="btn btn-sm btn-success">
                            <i className="bi bi-check-circle"></i> Mark as Booked
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No bikes found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageBikes
