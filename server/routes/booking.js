const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const router = express.Router();
const Bike = require('../models/bike');
const ConfirmedBooking = require('../models/ConfirmedBooking');
const sendEmail = require('../utils/sendEmail');


const jwtSecret = 'jwt-secret-key'; // use process.env in production

// Middleware to check user from token
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'No token found' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// GET /bookings - Fetch all bookings
router.get('/', authenticateUser, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').populate('bikeId', 'name');
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /bookings - Create a booking
// POST /bookings - Create a booking
router.post('/', authenticateUser, async (req, res) => {
  const { contact, bookingDate, package: selectedPackage, bikeId, bikeName } = req.body;
  const { id, name, email } = req.user;

  try {
    // Fetch bike details to get shopId
    const bike = await Bike.findById(bikeId); // Ensure Bike model is used here
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found' });
    }

    const ShopId = bike.ShopId; // Ensure the bike has a shopId field

    if (!ShopId) {
      return res.status(400).json({ error: 'Bike does not have a shopId' });
    }

    const booking = new Booking({
      userId: id,
      name,
      email,
      contact,
      bookingDate,
      package: selectedPackage,
      bikeId,
      bikeName,
      ShopId // Include the shopId in the booking
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// PUT /bookings/accept/:id - Accept a booking and move it to the confirmed bookings collection
// router.put('/accept/:id', authenticateUser, async (req, res) => {
//   const bookingId = req.params.id;

//   try {
//     // Find the booking by ID
//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }

//     // Create a new confirmed booking
//     const confirmedBooking = new ConfirmedBooking({
//       userId: booking.userId,
//       name: booking.name,
//       email: booking.email,
//       contact: booking.contact,
//       bookingDate: booking.bookingDate,
//       package: booking.package,
//       bikeId: booking.bikeId,
//       bikeName: booking.bikeName,
//       ShopId: booking.ShopId
//     });

//     // Save the confirmed booking
//     await confirmedBooking.save();

//     // Delete the original booking from the "Bookings" collection
//     await Booking.findByIdAndDelete(bookingId);

//     res.status(200).json({ message: 'Booking accepted and moved to confirmed bookings', confirmedBooking });
//   } catch (error) {
//     console.error('Error accepting booking:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// PUT /bookings/accept/:id
router.put('/accept/:id', authenticateUser, async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const confirmedBooking = new ConfirmedBooking({
      userId: booking.userId,
      name: booking.name,
      email: booking.email,
      contact: booking.contact,
      bookingDate: booking.bookingDate,
      package: booking.package,
      bikeId: booking.bikeId,
      bikeName: booking.bikeName,
      ShopId: booking.ShopId
    });

    await confirmedBooking.save();
    await Booking.findByIdAndDelete(bookingId);

    // Send confirmation email
    await sendEmail(
      booking.email,
      'Bike Booking Confirmed',
      `Hello ${booking.name},\n\nYour booking for ${booking.bikeName} on ${new Date(booking.bookingDate).toDateString()} has been confirmed.\n\nThank you for choosing us!`
    );

    res.status(200).json({ message: 'Booking accepted and moved to confirmed bookings', confirmedBooking });
  } catch (error) {
    console.error('Error accepting booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// DELETE /bookings/reject/:id - Reject a booking and delete it from the database
// router.delete('/reject/:id', authenticateUser, async (req, res) => {
//   const bookingId = req.params.id;

//   try {
//     // Find and delete the booking by ID
//     const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    
//     if (!deletedBooking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }

//     res.status(200).json({ message: 'Booking rejected and deleted from database', deletedBooking });
//   } catch (error) {
//     console.error('Error rejecting booking:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// DELETE /bookings/reject/:id
router.delete('/reject/:id', authenticateUser, async (req, res) => {
  const bookingId = req.params.id;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) return res.status(404).json({ error: 'Booking not found' });

    // Send rejection email
    await sendEmail(
      deletedBooking.email,
      'Bike Booking Rejected',
      `Hello ${deletedBooking.name},\n\nWe regret to inform you that your booking for ${deletedBooking.bikeName} on ${new Date(deletedBooking.bookingDate).toDateString()} has been rejected.\n\nPlease try again later or choose a different bike.\n\nSorry for the inconvenience.`
    );

    res.status(200).json({ message: 'Booking rejected and deleted from database', deletedBooking });
  } catch (error) {
    console.error('Error rejecting booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
