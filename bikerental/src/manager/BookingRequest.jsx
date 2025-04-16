import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ManagerSidebar from './ManagerSidebar';

function BookingRequest() {
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Extract token from cookies
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});

        const token = cookies['token'];

        if (!token) {
          console.error('Token not found in cookies.');
          return;
        }

        const decoded = jwtDecode(token);
        const userIdFromToken = decoded.id;

        console.log('Decoded token ID:', userIdFromToken);

        const response = await axios.get('http://localhost:3001/bookings', {
          withCredentials: true,
        });

        const allBookings = response.data.bookings || [];

        console.log('All bookings from API:', allBookings);

        const shopBookings = allBookings.filter((booking) => {
          const match = booking.ShopId?.toString() === userIdFromToken?.toString();
          console.log(`Booking ShopId: ${booking.ShopId}, Matches: ${match}`);
          return match;
        });

        setFilteredBookings(shopBookings);
      } catch (error) {
        console.error('Error fetching or decoding bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      console.log('Accepted booking with ID:', bookingId);
  
      // Make a PUT request to accept the booking and move it to the confirmed bookings
      const response = await axios.put(`http://localhost:3001/bookings/accept/${bookingId}`, {}, {
        withCredentials: true
      });
  
      console.log('Booking accepted:', response.data);
  
      // Optionally, you can update the UI or fetch updated data after the booking is accepted
      setFilteredBookings(filteredBookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };
  

  const handleReject = async (bookingId) => {
    try {
      console.log('Rejected booking with ID:', bookingId);
  
      // Make a DELETE request to reject and delete the booking
      const response = await axios.delete(`http://localhost:3001/bookings/reject/${bookingId}`, {
        withCredentials: true
      });
  
      console.log('Booking rejected and deleted:', response.data);
  
      // Update the UI by removing the rejected booking from the filteredBookings state
      setFilteredBookings(filteredBookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };
  

  return (
    <div className="admin-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Bike Name</th>
                <th className="border border-gray-300 px-4 py-2">Contact</th>
                <th className="border border-gray-300 px-4 py-2">Booking Date</th>
                <th className="border border-gray-300 px-4 py-2">Package</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {booking.name || booking.userId?.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {booking.email || booking.userId?.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {booking.bikeName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {booking.contact}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {booking.package}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-green-500 text-black px-4 py-2 mr-2"
                        onClick={() => handleAccept(booking._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-black px-4 py-2"
                        onClick={() => handleReject(booking._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No bookings found for your shop.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingRequest;
