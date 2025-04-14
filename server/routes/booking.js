const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const User = require('../models/register');
const Bike = require('../models/bike');
const router = express.Router();

const jwtSecret = 'jwt-secret-key'; // use your .env file in production

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

// POST /bookings
router.post('/', authenticateUser, async (req, res) => {
  const { contact, bookingDate, package: selectedPackage, bikeId } = req.body;
  const { id, name, email } = req.user;

  try {
    const booking = new Booking({
      userId: id,
      name,
      email,
      contact,
      bookingDate,
      package: selectedPackage,
      bikeId
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
