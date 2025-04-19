import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../user/Navbar";

const Yourbike = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3001/bookings/user", {
          withCredentials: true
        });
        console.log(res.data); // Log the response to verify that ShopId is populated
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch confirmed bookings:", err);
      }
    };

    fetchConfirmedBookings();
  }, []);

  // Helper function to check if the package is expired
  const isExpired = (bookingDate) => {
    const bookingTime = new Date(bookingDate).getTime();
    const currentTime = new Date().getTime();
    return currentTime > bookingTime;
  };

  // Split the bookings into two categories
  const currentlyBooked = bookings.filter(
    (booking) => !isExpired(booking.bookingDate)
  );
  const previouslyBooked = bookings.filter(
    (booking) => isExpired(booking.bookingDate)
  );

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Booked Bikes</h2>

        {/* Currently Booked Bikes Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Currently Booked Bikes</h3>
          {currentlyBooked.length === 0 ? (
            <p>No currently booked bikes.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentlyBooked.map((booking) => (
                <div
                  key={booking._id}
                  className="p-4 border rounded-lg bg-green-100"
                >
                  <h4 className="text-lg font-bold">{booking.bikeName}</h4>
                  <p className="mt-2">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p>Package: {booking.package}</p>
                  <p className="mt-2 font-semibold">
                    Shop: {booking.ShopId ? booking.ShopId.shopname : "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Previously Booked Bikes Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Previously Booked Bikes</h3>
          {previouslyBooked.length === 0 ? (
            <p>No previously booked bikes.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {previouslyBooked.map((booking) => (
                <div
                  key={booking._id}
                  className="p-4 border rounded-lg bg-red-100"
                >
                  <h4 className="text-lg font-bold">{booking.bikeName}</h4>
                  <p className="mt-2">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p>Package: {booking.package}</p>
                  <p className="mt-2 font-semibold">
                    Shop: {booking.ShopId ? booking.ShopId.shopname : "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Yourbike;
