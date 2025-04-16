const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: String,
  email: String,
  contact: String,
  bookingDate: Date,
  package: String,
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike', // Ensure this matches the actual model name
    required: true
  },
  bikeName: { 
    type: String,
    required: true
  },
  ShopId: {  // Add shopId field to reference the shop
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shopregister',  // Replace 'Shop' with the actual model name for shops
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
