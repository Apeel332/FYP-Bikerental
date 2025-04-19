import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerSidebar from './ManagerSidebar';

function ShopDetails() {
  const [shop, setShop] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/user', { withCredentials: true })
      .then(res => {
        if (res.data?.email) {
          axios.get(`http://localhost:3001/shopregister`)
            .then(result => {
              const currentShop = result.data.find(s => s.email === res.data.email);
              setShop(currentShop);
              if (currentShop?._id) {
                fetchConfirmedBookings(currentShop._id);
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, []);

  const fetchConfirmedBookings = async (shopId) => {
    try {
      const res = await axios.get(`http://localhost:3001/bookings/confirmed/${shopId}`, {
        withCredentials: true
      });

      const sorted = res.data.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
      setBookings(sorted);
    } catch (err) {
      console.log("Error fetching bookings", err);
    }
  };

  const getStatus = (bookingDate, packageDuration) => {
    const bookingTime = new Date(bookingDate);
    const now = new Date();
    const elapsedDays = (now - bookingTime) / (1000 * 60 * 60 * 24);

    const durationMap = {
      "1 Day": 1,
      "2 Days": 2,
      "3 Days": 3,
      "1 Week": 7
    };
    const allowedDays = durationMap[packageDuration] || 1;

    if (elapsedDays < allowedDays) return 'Green';
    if (elapsedDays >= allowedDays && elapsedDays < allowedDays + 1) return 'Yellow';
    return 'Red';
  };

  const getRowClass = (status) => {
    if (status === 'Green') return 'table-success';
    if (status === 'Yellow') return 'table-warning';
    if (status === 'Red') return 'table-danger';
    return '';
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '250px' }}>
        <ManagerSidebar />
      </div>

      {/* Shop Info */}
      <div className="bg-white border-end p-4" style={{ width: '300px' }}>
        <h5 className="mb-4 text-center">Shop Details</h5>
        {shop ? (
          <>
            <div className="text-center mb-4">
              <img
                src={`http://localhost:3001/uploads/${shop.image}`}
                alt="Shop"
                className="img-thumbnail"
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <p><strong>Name:</strong> {shop.shopname}</p>
            <p><strong>Owner:</strong> {shop.name}</p>
            <p><strong>Address:</strong> {shop.address}</p>
            <p><strong>Contact:</strong> {shop.contact}</p>
            <p><strong>Email:</strong> {shop.email}</p>
          </>
        ) : (
          <p className="text-muted">Loading shop info...</p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h4 className="mb-3">Users Currently Renting Bikes</h4>

        {/* Color Legend */}
        <div className="mb-3 d-flex flex-wrap gap-3 align-items-center">
          <div><span className="badge bg-success px-3 py-2">Green: Within Time</span></div>
          <div><span className="badge bg-warning text-dark px-3 py-2">Yellow: Near Expiry</span></div>
          <div><span className="badge bg-danger px-3 py-2">Red: Overdue</span></div>
        </div>

        {/* Filters */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            style={{ maxWidth: '250px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: '200px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Green">Within Time</option>
            <option value="Yellow">Near Expiry</option>
            <option value="Red">Overdue</option>
          </select>
        </div>

        {/* Booking Table */}
        {bookings.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>S.N</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Booking Date</th>
                  <th>Package</th>
                  <th>Bike Name</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter((booking) => {
                    const status = getStatus(booking.bookingDate, booking.package);
                    const nameMatch = booking.name.toLowerCase().includes(searchQuery.toLowerCase());
                    const statusMatch = statusFilter === 'All' || status === statusFilter;
                    return nameMatch && statusMatch;
                  })
                  .map((booking, index) => {
                    const status = getStatus(booking.bookingDate, booking.package);
                    const rowClass = getRowClass(status);
                    return (
                      <tr key={index} className={rowClass}>
                        <td>{index + 1}</td>
                        <td>{booking.name}</td>
                        <td>{booking.email}</td>
                        <td>{booking.contact}</td>
                        <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                        <td>{booking.package}</td>
                        <td>{booking.bikeName}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No current rentals found.</p>
        )}
      </div>
    </div>
  );
}

export default ShopDetails;
    